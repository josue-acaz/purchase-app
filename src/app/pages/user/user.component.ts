import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ToolsService } from  '../../shared/tools/tools.service';
import { UserService } from './user.service';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
    `
    @media only screen and (min-width: 800px) {
      .tbl-col1 { text-align:left; width: 30%; }
      .tbl-col2 { text-align:left; width: 30%; }
      .tbl-col3 { text-align:left; width: 30%; }
      .tbl-col-last { text-align:center; width: 10%;}
    }
  `]
})
export class UserComponent implements OnInit {

  searchForm: FormGroup;
  errors : string[];
  total_pages = 0;
  total_records = 0;
  query_param = { order : '', current_page : 1, row_per_page : 10 };
  processing : boolean = false;
  subscription_change_action: Subscription;
  data_list : User[];

  constructor(
    public service: UserService,
    public formBuilderSearch: FormBuilder,
    public toolsService: ToolsService
  ){}

  ngOnInit(){
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

    this.service.list(this.query_param).subscribe(
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

  edit(id: number){
    this.service.edit_id = id;
    this.service.change_action('editing');
  }

  // funcoes de navagação do list
  change_order(order: string){
    if (!this.query_param.order.includes(' Asc')){
      this.query_param.order = order + ' Asc'
    }else{
      this.query_param.order = order + ' Desc'
    }
    this.list();
  }

  change_row_per_page(){
    let n = this.query_param.row_per_page;
    if (n < 1 ) this.query_param.row_per_page = 10;
    this.query_param.current_page = 1;
    this.list();
  }

  next_page(){
    if (this.query_param.current_page < this.total_pages){
      this.query_param.current_page++;
      this.list();
    }
  }

  previous_page(){
    if (this.query_param.current_page > 1){
      this.query_param.current_page--;
      this.list();
    }
  }

  first_page(){
    this.query_param.current_page = 1;
    this.list();
  }

  last_page(){
    this.query_param.current_page = this.total_pages;
    this.list();
  }

}
