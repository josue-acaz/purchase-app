import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {CollapseModule, ModalModule, BsModalService, BsModalRef, TypeaheadMatch} from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PlatformDetectorService } from '../../../../../core/platform-detector/platform-detector.service';
import { JWModalService } from '../../../../../shared/jwmodal';
import { ToolsService } from  '../../../../../shared/tools/tools.service';
import { RequestItemService } from '../request-item.service';
import { RequestItem } from '../request-item.model';
import { Fluent } from '../../../../../shared/validators/fluent';


@Component({
  selector: 'app-request-item-edit',
  templateUrl: './request-item-edit.component.html'
})
export class RequestItemEditComponent implements OnInit {

  mainForm: FormGroup;
  errors : string[] = [];
  subscription_change_action: Subscription;
  processing: boolean = false;
  // Variáveis de controle
  dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  @ViewChild('input_focus', {static: true}) input_focus: ElementRef;

  // Dados do item que está sendo editado no formulário
  data_edit : RequestItem = new RequestItem();
  // Bloqueia os inputs se a requisição tiver sido efetivada
  isReadOnly: boolean = false;
  // Faixa de prioridade dos itens
  item_priority = ['Baixa', 'Média', 'Alta'];
  // Controla a caixa de pesquisa por PN do item
  states: Observable<any>;
  item_typeahead_loading: boolean;

  constructor(
    public toolsService: ToolsService,
    public toastr: ToastrService,
    public service: RequestItemService,
    public formBuilder: FormBuilder,
    public modalService: JWModalService,
    public platformDetectorService: PlatformDetectorService,
    public fluent: Fluent,
  ) { }

  ngOnInit() {
    this.errors = [];

    this.createForm();

    // Se o status da requisição for 'Em digitação', será permitido ao usuário alterar os inputs
    if(this.service.master_status == 'E')
    {
      this.isReadOnly = false;
    }
    // Se o status da requisição for 'Requisição Ativa', será bloqueado os inputs para alteração
    if(this.service.master_status == 'A' || this.service.master_status == 'C' || this.service.master_status == 'P' || this.service.master_status == 'N')
    {
      this.isReadOnly = true;
    }

    // Verifica se a ação de editar um item é a que será executada
    this.subscription_change_action = this.service.change_action_emitter.subscribe(action => {
      if (action=='editing') this.edit();
    });

    // Monitora a barra de pesquisa por pn do item
    this.states = Observable.create((observer: any) => { observer.next(this.mainForm.value.itm_pn); })
      .pipe(mergeMap((token: string) => this.service.filterResults(token)));
  }

  ngOnDestroy() {
    this.subscription_change_action.unsubscribe();
  }

  // Cria o formulário reativo da requisição com algumas validações
  createForm(){
    this.mainForm = this.formBuilder.group({
      itm_id: 0,
      itm_request_id: 0,
      itm_status_id: 1,
      itm_pn: ['', Validators.compose([Validators.required])],
      itm_quantity: [0, Validators.compose([Validators.required])],
      itm_approved_quantity: 0,
      itm_description: ['', Validators.compose([Validators.maxLength(500)])],
      itm_application: ['', Validators.compose([Validators.required])],
      itm_priority: ['', Validators.compose([Validators.required])],
      itm_deadline: ['', Validators.compose([Validators.required])],
      itm_active: true,
      itm_excluded: false
    });
  }

  list(){
    this.service.change_action('listing');
  }

  // Cria um novo item
  save(next_action:string){
    this.errors = [];
    this.processing  = true;

    this.data_edit = JSON.parse(JSON.stringify(this.mainForm.value));
    this.data_edit.itm_deadline = this.toolsService.format_data_br_sql(this.data_edit.itm_deadline);
    this.data_edit.itm_request_id = this.service.master_id;
    if(this.data_edit.itm_description == "") { this.data_edit.itm_description = "Nenhuma"; }

    // Cria um novo item
    if(this.data_edit.itm_id == 0)
    {
      console.log("Criando um novo item...");
      this.service.save(this.data_edit).subscribe(
        response =>{
          this.processing = false;
          if (response.resultStatus=='success'){
            this.toastr.success('Registro salvo com sucesso!','OK!');
            if (next_action=='list'){
              this.service.edit_id = JSON.parse(JSON.stringify(response.data));
              this.list();
            }else{
              this.service.edit_id = 0;
              this.edit();
            }
          }else{
            for (let i = 0; i < response.resultMessages.length; i++) {
              this.errors.push(response.resultMessages[i]);
            }
            this.toastr.error('Erro ao salvar!','ERRO!');
          }
        }, error => {
          if (typeof error.InvalidModelState === "undefined") {
            this.errors.push(error);
          }else{
            for (let i = 0; i < error.InvalidModelState.length; i++) {
              this.errors.push(error.InvalidModelState[i]);
            }
          }
          this.processing = false;
          this.toastr.error('Não foi possível salvar o registro!','ERRO!');
        });
    }
    // Atualiza um item existente
    else{
      console.log("Atualizando um item...");
      this.service.update(this.service.edit_id, this.data_edit).subscribe(response => {
        this.processing = false;
        if (response.resultStatus=='success'){
          this.toastr.success('Registro atualizado com sucesso!','OK!');
          if (next_action=='list'){
            this.service.edit_id = JSON.parse(JSON.stringify(response.data));
            this.list();
          }else{
            this.service.edit_id = 0;
            this.edit();
          }
        }else{
          for (let i = 0; i < response.resultMessages.length; i++) {
            this.errors.push(response.resultMessages[i]);
          }
          this.toastr.error('Erro ao salvar!','ERRO!');
        }
      }, error => {
        if (typeof error.InvalidModelState === "undefined") {
          this.errors.push(error);
        }else{
          for (let i = 0; i < error.InvalidModelState.length; i++) {
            this.errors.push(error.InvalidModelState[i]);
          }
        }
        this.processing = false;
        this.toastr.error('Não foi possível salvar o registro!','ERRO!');
      });
    }
  }

  // Edita um determinado item
  edit(){
    this.errors = [];
    this.mainForm.setValue(new RequestItem());
    setTimeout(() => { this.platformDetectorService.isPlatformBrowser() && this.input_focus.nativeElement.focus(); }, 300);
    this.processing = true;

    console.log("Mater ID --> " + this.service.master_id);
    console.log("Edit ID --> " + this.service.edit_id);

    // Se for um novo item, então pegar os dados da requisição e setar como valores padrões
    if (this.service.edit_id == 0)
    {
      console.log("É um novo item!");
      this.service.getRequestDependencies(this.service.master_id).subscribe(response => {
        this.processing = false;
        if(response.resultStatus == 'success'){
          var data = JSON.parse(JSON.stringify(response.data));
          this.data_edit.itm_application = data.req_application;
          this.data_edit.itm_quantity = 1;
          this.data_edit.itm_deadline = this.toolsService.format_data_sql_br(data.req_deadline);
          this.mainForm.setValue(this.data_edit);
          // Configura como default o valor da prioridade obtida da requisição
          this.mainForm.patchValue({
            itm_priority: data.req_priority
          });
        }
        else{
          for (let i = 0; i < response.resultMessages.length; i++) {
            this.errors.push(response.resultMessages[i]);
          }
        }
      }, error => {
        this.processing = false;
        this.errors.push(error);
      });
    }
    // Se não for, então buscar os dados do item existente
    else{
      console.log("É um item existente!");
      this.service.getById(this.service.edit_id).subscribe(response => {
        this.processing = false;
        if(response.resultStatus == 'success'){
          this.data_edit = JSON.parse(JSON.stringify(response.data));
          this.data_edit.itm_deadline = this.toolsService.format_data_sql_br(this.data_edit.itm_deadline);
          this.mainForm.setValue(this.data_edit);
        }
        else{
          for (let i = 0; i < response.resultMessages.length; i++) {
            this.errors.push(response.resultMessages[i]);
          }
        }
      }, error => {
        this.processing = false;
        this.errors.push(error);
      });
    }
  }

  // Exclui um determinado item
  delete() {
    this.errors = [];
    this.processing  = true;
    this.modalService.close('confirm-delete-modal-movprod-item');
    var obj = JSON.parse(JSON.stringify(this.mainForm.value));

    this.service.delete(obj.itm_id).subscribe(
      result =>{
        this.processing  = false;
        if (result.resultStatus=='success'){
          this.toastr.success('Registro excluido com sucesso!','OK!');
          this.list();
        }else{
          for (let i = 0; i < result.resultMessages.length; i++) {
            this.errors.push(result.resultMessages[i]);
          }
          this.toastr.error('Erro ao excluir!','ERRO!');
        }
      },
      error => {
        this.processing  = false;
        this.errors.push(error);
        this.toastr.error('Erro ao excluir!','ERRO!');
      }
    )
  }

  item_change_typeahead_loading(e: boolean): void {
    this.item_typeahead_loading = e;
  }

  item_typeahead_onselect(e: TypeaheadMatch): void {
    console.log(e);
  }

}
