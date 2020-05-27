import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ToolsService } from  '../../../../shared/tools/tools.service';
import { RequestItemService } from './request-item.service';
import { RequestService } from '../../request.service';
import { RequestItem } from './request-item.model';

@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styles: [
    `
    @media only screen and (min-width: 800px) {
      .tbl-col1 { text-align:left; width: 40%; }
      .tbl-col2 { text-align:left; width: 30%; }
      .tbl-col3 { text-align:left; width: 30%; }
      .tbl-col-last { text-align:center; width: 10%;}
    }
  `]
})
export class RequestItemComponent implements OnInit {

  @Input() master_id: number;
  @Input() master_status: string; // Guarda o status da requisição
  searchForm: FormGroup;
  errors : string[];
  total_pages = 0;
  total_records = 0;
  query_param = {list_inactive: false, current_page : 1, row_per_page : 1000, itm_request_id: 0 };
  processing : boolean = false;
  subscription_change_action: Subscription;

  data_list : RequestItem[];
  resume : Object;

  constructor(
    public req_service: RequestService,
    public service: RequestItemService,
    public formBuilderSearch: FormBuilder,
    public toolsService: ToolsService) { }

  ngOnInit() {

    this.service.master_id = this.master_id;
    this.service.master_status = this.master_status;
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
    this.query_param =  Object.assign({}, this.query_param, this.searchForm.value);
    this.query_param.itm_request_id = this.service.master_id;

    this.service.list(this.query_param).subscribe(
      result =>{
        console.log('Itens da requisição --> ' + result.data);
        this.processing = false;
        if (result.resultStatus=='success'){
          this.total_records = parseInt(result.totalRecords);
          this.total_pages = parseInt(result.totalPages);
          this.data_list = JSON.parse(JSON.stringify(result.data));
          this.resume =  JSON.parse(JSON.stringify(result.resume));
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
      });
  }

  edit(id: number){
    this.service.edit_id = id;
    this.service.change_action('editing');
  }
}
