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
import { error } from '@angular/compiler/src/util';
import { TypeaheadMatch } from 'ngx-bootstrap';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styles: [
    `
    @media only screen and (min-width: 800px) {
      .tbl-col1 { text-align:left; width: 15%; }
      .tbl-col2 { text-align:left; width: 30%; }
      .tbl-col3 { text-align:left; width: 30%; }
      .tbl-col4 { text-align:right; width: 15%; }
      .tbl-col-last { text-align:center; width: 10%;}
    }
  `]
})
export class RequestComponent implements OnInit {

  searchForm: FormGroup;
  advance_search: boolean = false;
  erros: string[];
  total_pages = 0;
  total_records = 0;
  query_params = { order: 'desc', current_page: 1, row_per_page: 10 };
  processing: boolean = false;
  subscription_change_action: Subscription;
  data_list: Request[];

  constructor(
    public service: RequestService,
    public formBuilderSearch: FormBuilder,
    public toolsService: ToolsService){}

  ngOnInit(){
    this.subscription_change_action = this.service.change_action_emitter.subscribe(action => {
      if(action == 'listing') this.list();
    });

    this.createSearchForm();
    this.list();
  }

  // Cria o formulário
  createSearchForm(){
    this.searchForm = this.formBuilderSearch.group({
      text_search: this.formBuilderSearch.control(''),
      list_open: this.formBuilderSearch.control(true),
      list_finished: this.formBuilderSearch.control(true)
    });
  }

  // Listar requisições
  list(){
    this.advance_search = false;
    this.processing = true;
    this.erros = [];
    this.data_list = [];
    this.query_params = Object.assign({}, this.query_params, this.searchForm.value);

    this.service.list(this.query_params).subscribe(result => {
      this.processing = false;
      // Se a solicitação for concluída com sucesso, então liste as requisições
      if(result.resultStatus == 'success'){
        this.total_records = parseInt(result.totalRecords);
        this.total_pages = parseInt(result.totalPages);
        this.data_list = JSON.parse(JSON.stringify(result.data));
        this.service.action = 'listing';
      } else // Caso não, mostre os erros gerados
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

  // Adicionar requisição
  edit(id: number){
    this.advance_search = false;
    this.service.edit_id = id;
    this.service.changeAction('editing');
  }

  // PAGINAÇÃO
  // Altera a ordem de exibição dos registros
  change_order(order: string){
    if (!this.query_params.order.includes(' Asc')){
      this.query_params.order = order + ' Asc'
    }else{
      this.query_params.order = order + ' Desc'
    }
    this.list();
  }

  // Altera a o número de registros por página
  change_row_per_page(){
    let n = this.query_params.row_per_page;
    if (n < 1 ) this.query_params.row_per_page = 10;
    this.query_params.current_page = 1;
    this.list();
  }

  // Vai para a próxima página
  next_page(){
    if (this.query_params.current_page < this.total_pages){
      this.query_params.current_page++;
      this.list();
    }
  }

  // Volta à página anterior
  previous_page(){
    if (this.query_params.current_page > 1){
      this.query_params.current_page--;
      this.list();
    }
  }

  // Retorna a primeira página
  first_page(){
    this.query_params.current_page = 1;
    this.list();
  }

  // Retorna a última página
  last_page(){
    this.query_params.current_page = this.total_pages;
    this.list();
  }
}
