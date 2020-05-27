import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HubConnection,HubConnectionBuilder } from '@aspnet/signalr';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';
import { JWModalService } from '../../shared/jwmodal';
import { ToolsService } from  '../../shared/tools/tools.service';
import { RequestService } from '../request/request.service';
import { Request } from '../request/request.model';
import { PendingRequestsService } from '../pending-requests/pending-requests.service';
import { error } from '@angular/compiler/src/util';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html'
})
export class PendingRequestsComponent implements OnInit {

  subscription_change_action: Subscription;
  erros: string[]; // Guarda os eventuais erros gerados pela solicitação do recurso
  processing: boolean = false; // Diz se o serviço está buscando os dados na API
  requests: Request[]; // Dados das requisições
  data_list: Object[]; // Dados que serão listados (Requisição + Usuário)
  query_params = { order: 'desc', current_page: 1, row_per_page: 10, list_open: false, list_finished: true };
  request_user = {} // Informa qual o usuário que solicitou a requisição

  // Busca avançada
  searchForm: FormGroup;
  advance_search: boolean = false;

  // Paginação
  total_pages = 0;
  total_records = 0;

  constructor(
    private user_service: UserService,
    private service : PendingRequestsService,
    private toolsService: ToolsService,
    public formBuilderSearch: FormBuilder,
    ) { }

  ngOnInit() {
    this.subscription_change_action = this.service.change_action_emitter.subscribe(action => {
      if(action == 'listing') this.list();
    });

    // Chama a função de criação do formulário de pesquisa
    this.createSearchForm();

    // Chama a listagem das requisições
    this.list();
  }

  // Cria formulário de pesquisa
  createSearchForm(){
    this.searchForm = this.formBuilderSearch.group({
      text_search: this.formBuilderSearch.control(''),
      list_pending: this.formBuilderSearch.control(true),
      list_finished: this.formBuilderSearch.control(true)
    });
  }

  // Lista as requisições que estão com o status 'A' (Ativo ou Efetivado)
  list()
  {
    this.requests = [];
    this.processing = true;
    this.query_params = Object.assign({}, this.query_params, this.searchForm.value);

    this.service.list(this.query_params).subscribe(result => {

      if(result.resultStatus == 'success'){
        this.total_records = parseInt(result.totalRecords);
        this.total_pages = parseInt(result.totalPages);
        this.requests = JSON.parse(JSON.stringify(result.data));

        // Obter o tamanho do array de requisições
        this.data_list = [this.requests.length];

        // Obter informações do usuário que fez a requisição
        this.requests.forEach((element, index) => {
          this.user_service.getById(element.req_user_id).subscribe(res => {
            this.processing = false;

            if(res.resultStatus == 'success'){

              element.req_sent_date_hour = this.toolsService.format_data_sql_br(element.req_sent_date_hour) + " às " + this.toolsService.getHourToDatetime(element.req_sent_date_hour);
              element.req_deadline = this.toolsService.format_data_sql_br(element.req_deadline);

              this.request_user = JSON.parse(JSON.stringify(res.data));
              this.data_list[index] = Object.assign({}, element, this.request_user);
              console.log(this.data_list[index]);

              this.service.action = 'listing';
            }
            else
            {
              for(let i=0; i<result.resultMessages.length; i++){
                this.service.action = '';
                this.erros.push(result.resultMessages[i]);
              }
            }
          }, error => {
            this.processing = false;
            this.erros.push(error);
          });
        });
      }
      else
      {
        for(let i=0; i<result.resultMessages.length; i++){
          this.service.action = '';
          this.erros.push(result.resultMessages[i]);
        }
      }
    }, error => {
      this.processing = false;
      this.erros.push(error);
    });
  }

  // Mostra os detalhes da requisição, incluindo suas informações e itens pertinentes
  show(id: number){
    this.service.show_id = id;
    this.service.changeAction('showing');
  }

  first_page(){}
}
