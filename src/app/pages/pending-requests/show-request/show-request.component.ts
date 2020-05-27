import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { ToolsService } from '../../../shared/tools/tools.service';
import { Fluent } from '../../../shared/validators/fluent';
import { mergeMap } from 'rxjs/operators';
import { JWModalService } from '../../../shared/jwmodal';
import { Request } from '../../request/request.model';
import { PlatformDetectorService } from '../../../core/platform-detector/platform-detector.service';
import { MessageService } from '../../../shared/services/message.service';
import { PendingRequestsService } from '../../pending-requests/pending-requests.service';
import { PendingItemsService } from '../show-request/pending-items/pending-items.service';
import { UserService } from '../../user/user.service';
import { request } from 'http';

@Component({
  selector: 'app-show-request',
  templateUrl: './show-request.component.html'
})
export class ShowRequestComponent implements OnInit {

  subscription_change_action: Subscription;
  errors: string[]; // Guarda os eventuais erros gerados pela solicitação do recurso
  processing: boolean = false; // Diz se o serviço está buscando os dados na API
  request: Request; // Dados da requisição
  request_user = {} // Informa qual o usuário que solicitou a requisição
  data_show: Object; // Dados que serão listados

  constructor(
    public service: PendingRequestsService,
    public pendingItemsService: PendingItemsService,
    public toolsService: ToolsService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.subscription_change_action = this.service.change_action_emitter.subscribe(action => {
      if (action=='showing') this.show();
    });
  }

  // Mostra os dados da requisição
  show()
  {
    this.errors = [];
    this.processing = true;

    this.service.getById(this.service.show_id).subscribe(response => {

      if(response.resultStatus == 'success'){
        this.request = JSON.parse(JSON.stringify(response.data));
        this.request.req_sent_date_hour = this.toolsService.format_data_sql_br(this.request.req_sent_date_hour) + " às " + this.toolsService.getHourToDatetime(this.request.req_sent_date_hour);
        this.request.req_deadline = this.toolsService.format_data_sql_br(this.request.req_deadline);
        console.log(this.request);

        this.userService.getById(this.request.req_user_id).subscribe(res => {
          this.processing = false;

          if(res.resultStatus == 'success')
          {
            this.request_user = JSON.parse(JSON.stringify(res.data));
            this.data_show = Object.assign({}, this.request, this.request_user);
            this.service.show_id = this.request.req_id;
          }
        });
      } else{
        for(let i=0; i<response.resultMessages.length; i++)
        {
          this.errors.push(response.resultMessages[i]);
        }
      }
    },
    error => {
      this.processing = false;
      this.errors.push(error);
    });
  }

  // Entra no modo de listagem dos itens da requisição
  edit(id: number){
    this.service.show_id = id;
    this.service.changeAction('listing');
  }

  // Retorna à listagem das requisições
  list()
  {
    this.service.changeAction('listing');
  }

}
