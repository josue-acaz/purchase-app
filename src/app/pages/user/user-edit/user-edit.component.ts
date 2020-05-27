import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TypeaheadMatch } from 'ngx-bootstrap';

import { PlatformDetectorService } from '../../../core/platform-detector/platform-detector.service';
import { JWModalService } from '../../../shared/jwmodal';
import { ToolsService } from  '../../../shared/tools/tools.service';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {

  mainForm: FormGroup;
  errors : string[] = [];
  subscription_change_action: Subscription;
  processing: boolean = false;
  @ViewChild('input_focus', {static: true}) input_focus: ElementRef;

  data_edit : User = new User();

  constructor(
    public service: UserService,
    public toolsService: ToolsService,
    public toastr: ToastrService,
    public formBuilder: FormBuilder,
    public modalService: JWModalService,
    public platformDetectorService: PlatformDetectorService
  ) { }

  ngOnInit() {
    this.errors = [];

    this.createForm();

    this.subscription_change_action = this.service.change_action_emitter.subscribe(action => {
      if (action=='editing') this.edit();
    });

  }

  ngOnDestroy() {
    this.subscription_change_action.unsubscribe();
  }

  createForm(){
    this.mainForm = this.formBuilder.group(this.data_edit);
  }

  list(){
    this.service.change_action('listing');
  }

  save(){
    this.errors = [];
    this.processing  = true;

    var obj = JSON.parse(JSON.stringify(this.mainForm.value));
    this.service.save(obj, obj.use_id).subscribe(
      result =>{
        this.processing = false;
        if (result.resultStatus=='success'){
          this.toastr.success('Registro salvo com sucesso!','OK!');
          this.service.edit_id = JSON.parse(JSON.stringify(result.data));
          this.edit();
        }else{

          for (let i = 0; i < result.resultMessages.length; i++) {
            this.errors.push(result.resultMessages[i]);
          }

          this.toastr.error('Erro ao salvar!','ERRO!');
        }
      },
      error => {
        if (typeof error.InvalidModelState === "undefined") {
          this.errors.push(error);
        }else{
          for (let i = 0; i < error.InvalidModelState.length; i++) {
            this.errors.push(error.InvalidModelState[i]);
          }
        }
        this.processing = false;
        this.toastr.error('Não foi possível salvar o registro!','ERRO!');
      }
    )
  }

  edit(){
    this.errors = [];

    this.mainForm.setValue(new User() );
    setTimeout(() => { this.platformDetectorService.isPlatformBrowser() && this.input_focus.nativeElement.focus(); }, 300);
    if (this.service.edit_id == 0) return false;

    this.processing = true;
    this.service.getById(this.service.edit_id).subscribe(
      result =>{
        this.processing = false;
        if (result.resultStatus=='success'){
          this.data_edit = JSON.parse(JSON.stringify(result.data));

          this.mainForm.setValue(this.data_edit);
        }else{
          for (let i = 0; i < result.resultMessages.length; i++) {
            this.errors.push(result.resultMessages[i]);
          }
        }
      },
      error => {
        this.processing = false;
        this.errors.push(error);
      }
    )
  }

  delete() {
    this.errors = [];
    this.processing  = true;
    this.modalService.close('confirm-delete-modal-user');
    var obj = JSON.parse(JSON.stringify(this.mainForm.value));

    this.service.delete(obj.use_id).subscribe(
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

}
