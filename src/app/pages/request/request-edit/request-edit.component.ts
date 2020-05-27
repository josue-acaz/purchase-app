import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { ToolsService } from '../../../shared/tools/tools.service';
import { Fluent } from '../../../shared/validators/fluent';
import { mergeMap } from 'rxjs/operators';
import { RequestService } from '../request.service';
import { JWModalService } from '../../../shared/jwmodal';
import { Request } from '../request.model';
import { PlatformDetectorService } from '../../../core/platform-detector/platform-detector.service';
import { MessageService } from '../../../shared/services/message.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html'
})
export class RequestEditComponent implements OnInit {
  requestForm: FormGroup; // Grupo de formulário da requisição
  data_edit: Request = new Request(); // Modelo de dados da requisição
  request_priority = [ { value: "Baixa" }, { value: "Média" }, { value: "Alta" } ]; // Níveis de prioridade da requisição

  // Variáveis de controle
  dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]; // Máscara para o campo Data Limite
  @ViewChild('input_focus', {static: true}) input_focus: ElementRef;
  processing: boolean = false;
  errors: string[] = [];
  subscription_change_action: Subscription;
  isReadOnly: boolean = false; // Bloqueia os campos de input se a requisição tiver sido efetivada

  constructor(
    public formBuilder : FormBuilder,
    public toolsService: ToolsService,
    public service: RequestService,
    public toastr: ToastrService,
    public modalService: JWModalService,
    public platformDetectorService: PlatformDetectorService,
    public fluent: Fluent,
    public messageService: MessageService
    ) { }

  ngOnInit() {
    // --> Inicializa a lista de erros ocmo sendo vazia
    this.errors = [];

    // --> Chama o criador do formulário
    this.createForm();

    // --> Subscreve a ação de monitoramento para verificar se o usuário está editando ou listando
    this.subscription_change_action = this.service.change_action_emitter.subscribe(action => {
      if (action=='editing') this.edit();
    });
  }

  // Cria o formulário
  createForm(){
    this.requestForm = this.formBuilder.group({
      req_id: '',
      req_user_id: '',
      req_sent_date_hour: '',
      req_application: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
      req_priority: ['', Validators.compose([Validators.required])],
      req_description: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])],
      req_deadline: ['', Validators.compose([Validators.required])],
      req_status: '',
      req_active: true,
      req_excluded: false
    });
  }

  // Decide se a requisição vai ser criada ou atualizada
  OnSubmitRequest()
  {
    if(this.service.edit_id != 0)
    {
      this.update();
    } else{
      this.save();
    }
  }

  // Salva a requisição
  save(){
    this.errors = [];
    this.processing = true;
    this.data_edit = JSON.parse(JSON.stringify(this.requestForm.value));

    this.data_edit.req_deadline = this.toolsService.format_data_br_sql(this.data_edit.req_deadline);
    this.data_edit.req_sent_date_hour = this.toolsService.GetCurrentDateHour();

    this.service.save(this.data_edit).subscribe(response => {
      this.processing = false;
      if(response.resultStatus == 'success'){
        this.toastr.success('Registro salvo com sucesso!', 'OK!');
        this.service.edit_id = JSON.parse(JSON.stringify(response.data));
        this.list();
      }
    });
  }

  // Atualiza a requisição
  update(){
    this.errors = [];
    this.processing = true;
    this.data_edit = JSON.parse(JSON.stringify(this.requestForm.value));

    this.data_edit.req_deadline = this.toolsService.format_data_br_sql(this.data_edit.req_deadline);
    this.service.update(this.service.edit_id, this.data_edit).subscribe(response => {
      this.processing = false;
      if(response.resultStatus == 'success'){
        this.toastr.success('Registro atualizado com sucesso!', 'Ok!');
        this.service.edit_id = JSON.parse(JSON.stringify(response.data));
      }
    });
  }

  // Sai do modo de edição da requisição e retorna a listagem
  list()
  {
    this.service.changeAction('listing');
  }

  // Entra no modo de edição da requisição
  edit()
  {
    this.errors = [];
    this.requestForm.setValue(new Request());
    setTimeout(() => {
      this.platformDetectorService.isPlatformBrowser() && this.input_focus.nativeElement.focus();
    }, 300);

    // Se for uma nova requisição, retornar daqui mesmo para impedir que os dados sejam buscados no banco de dados
    if(this.service.edit_id == 0){
      this.isReadOnly = false;
      return false;
    }

    this.processing = true;
    this.service.getById(this.service.edit_id).subscribe(response => {
      this.processing = false;
      if(response.resultStatus == 'success'){
        this.data_edit = JSON.parse(JSON.stringify(response.data));

        if(this.data_edit.req_status=='A' || this.data_edit.req_status=='C' || this.data_edit.req_status=='P' || this.data_edit.req_status=='N')
        {
          this.isReadOnly = true; // Bloquear inputs
        }else{
          this.isReadOnly = false; // Liberar inputs
        }

        console.log("Status da requisição é --> " + this.data_edit.req_application);
        this.data_edit.req_deadline = this.toolsService.format_data_sql_br(this.data_edit.req_deadline);
        this.requestForm.setValue(this.data_edit);
        console.log(this.requestForm.value);
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

  // Finaliza a requisição atual
  finish()
  {
    this.errors = [];
    this.processing  = true;
    this.modalService.close('confirm-finish-modal-request');
    var obj = JSON.parse(JSON.stringify(this.requestForm.value));

    // Gera a mensagem para o aprovador e finaliza a requisição
    this.service.finish(obj.req_id, this.messageService.generateMsg('request', obj.req_id, 1, 2)).subscribe(
      result =>{
        this.processing  = false;
        if (result.resultStatus=='success'){
          this.toastr.success('Registro Efetivado com sucesso!','OK!');
          this.list();
        }else{
          for (let i = 0; i < result.resultMessages.length; i++) {
            this.errors.push(result.resultMessages[i]);
          }
          this.toastr.error('Erro ao Efetivar!','ERRO!');
        }
      },
      error => {
        this.processing  = false;
        this.errors.push(error);
        this.toastr.error('Erro ao Efetivar!','ERRO!');
      }
    )
  }

  // Exclui a requisição
  delete()
  {
    this.errors = [];
    this.processing  = true;
    this.modalService.close('confirm-delete-modal-request');
    var obj = JSON.parse(JSON.stringify(this.requestForm.value));

    this.service.delete(obj.req_id).subscribe(response => {
      this.processing = false;
      if(response.resultStatus == 'success'){
        this.toastr.success('Registro excluído com sucesso!', 'OK!');
        this.list();
      }else{
        for(let i=0; i<response.resultMessages.length; i++){
          this.errors.push(response.resultMessages[i]);
        }
        this.toastr.error('Erro ao excluir!', 'ERRO!');
      }
    }, error => {
      this.processing = false;
      this.errors.push(error);
      this.toastr.error('Erro ao excluir!', 'ERRO!');
    });
  }

  // Reabre a requisição, mesmo depois de efetivada
  reopen()
  {
    this.errors = [];
    this.processing  = true;
    this.modalService.close('confirm-reopen-modal-request');
    var obj = JSON.parse(JSON.stringify(this.requestForm.value));

    this.service.reopen(obj.req_id).subscribe(
      result =>{
        this.processing  = false;
        if (result.resultStatus=='success'){
          this.toastr.success('Requisição Estornada com sucesso!','OK!');
          this.edit();
        }else{
          for (let i = 0; i < result.resultMessages.length; i++) {
            this.errors.push(result.resultMessages[i]);
          }
          this.toastr.error('Erro ao Estornar!','ERRO!');
        }
      },
      error => {
        this.processing  = false;
        this.errors.push(error);
        this.toastr.error('Erro ao Estornar!','ERRO!');
      }
    )
  }

}
