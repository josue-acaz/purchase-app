import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ToolsService } from  '../../../shared/tools/tools.service';
import { UserPermissionService } from './user-permission.service';
import { User } from '../../user/user.model';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styles: [
    `
    @media only screen and (min-width: 800px) {
      .tbl-col1 { text-align:left; width: 40%; }
      .tbl-col2 { text-align:left; width: 15%;}
      .tbl-col3 { text-align:left; width: 15%;}
      .tbl-col4 { text-align:left; width: 15%;}
      .tbl-col5 { text-align:left; width: 15%;}
    }
  `]
})

export class UserPermissionComponent implements OnInit{
  @Input() master_id: number;
  searchForm: FormGroup;
  errors : string[];
  total_pages = 0;
  total_records = 0;
  query_param = {order : '', current_page : 1, row_per_page : 1000, master_id : 0 };
  processing : boolean = false;
  subscription_change_action: Subscription;

  data_list : User[];

  constructor(
    public service: UserPermissionService,
    public formBuilderSearch: FormBuilder,
    public toastr: ToastrService,
    public toolsService: ToolsService
  ){}

  ngOnInit(){
    this.service.master_id = this.master_id;
    this.subscription_change_action = this.service.change_action_emitter.subscribe(action => {
      if (action=='listing') this.list();
    });

    this.createSearchForm();
    this.list();
  }

  ngOnDestroy() {
    this.subscription_change_action.unsubscribe()
  }


  createSearchForm(){
    this.searchForm = this.formBuilderSearch.group({
      text_search: this.formBuilderSearch.control('')
    })
  }

  list(){
    this.processing = true;
    this.errors = [];
    this.data_list = [];
    this.query_param =  Object.assign({}, this.query_param, this.searchForm.value);;
    this.query_param.master_id = this.service.master_id;

    this.service.get_list_http(this.query_param).subscribe(
      result =>{
        this.processing = false;
        if (result.resultStatus=='success'){
          this.total_records = parseInt(result.totalRecords);
          this.total_pages = parseInt(result.totalPages);
          this.data_list = JSON.parse(JSON.stringify(result.data));
          this.service.action = 'listing';
        }else{

          for (let i = 0; i < result.resultMessages.length; i++) {
            this.service.action = '';
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

  saveCheck(per_id, action, checked){
    var obj = {per_id : per_id, is_checked: checked, action: action};
    this.errors = [];
    this.service.saveCheck(obj).subscribe(
      result =>{
        if (result.resultStatus=='success'){
        }else{

          for (let i = 0; i < result.resultMessages.length; i++) {
            this.errors.push(result.resultMessages[i]);
          }

          this.toastr.error('Não foi possível salvar o registro! ' + this.errors,'ERRO!');
        }
      },
      error => {
        this.errors.push(error);
        this.toastr.error('Não foi possível salvar o registro! ' + this.errors,'ERRO!');
      }
    )
  }

  applyPerfil(){
    var obj = {use_id : this.master_id, perfil: "basico"};
    this.errors = [];
    this.service.applyPerfil(obj).subscribe(
      result =>{
        if (result.resultStatus=='success'){
          this.list();
        }else{

          for (let i = 0; i < result.resultMessages.length; i++) {
            this.errors.push(result.resultMessages[i]);
          }

          this.toastr.error('Não foi possível salvar o registro! ' + this.errors,'ERRO!');
        }
      },
      error => {
        this.errors.push(error);
        this.toastr.error('Não foi possível salvar o registro! ' + this.errors,'ERRO!');
      }
    )
  }


}
