import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { List } from 'lodash';
import { RequestItem } from '../../../request/request-edit/request-item/request-item.model';
import { PendingItemsService } from './pending-items.service';
import { ToolsService } from '../../../../shared/tools/tools.service';
import { ToastrService } from 'ngx-toastr';
import { JWModalService } from '../../../../shared/jwmodal';
import { CheckItems } from './check-items.model';
import { element } from 'protractor';

@Component({
  selector: 'app-pending-items',
  templateUrl: './pending-items.component.html'
})
export class PendingItemsComponent implements OnInit {

  @Input() master_id: number;
  subscription_change_action: Subscription;
  errors: string[]; // Guarda os eventuais erros gerados pela solicitação do recurso
  processing: boolean = false; // Diz se o serviço está buscando os dados na API
  items: RequestItem[]; // Dados dos itens obtidos
  query_param = {list_inactive: false, current_page : 1, row_per_page : 1000, itm_request_id: 0 };
  resume : Object; // Resumo da solicitação http

  // Checagem de itens
  masterSelected:boolean; // Controla se todos os itens estão selecionados ou não
  checkItems: CheckItems[]; // Lista de itens que serão selecionados
  checkItem = { id: 0, item: null, isSelected: false }; // Item a ser selecionado
  checkedList: any[]; // Itens selecionados

  itemsToApprove: RequestItem[]; // Itens para aprovação
  itemsToReject: RequestItem[]; // Itens para rejeição

  constructor(
    public service: PendingItemsService,
    public toolsService: ToolsService,
    public toastr: ToastrService,
    public modalService: JWModalService
  ) { }

  ngOnInit() {
    this.service.master_id = this.master_id;
    this.subscription_change_action = this.service.change_action_emitter.subscribe(action => {
      if (action=='listing') this.list();
    });

    this.list();
  }

  // Lista os itens da requisição
  list()
  {
    this.processing = true;
    this.errors = [];
    this.items = [];
    this.checkItems = [];

    this.query_param.itm_request_id = this.service.master_id
    this.query_param =  Object.assign({}, this.query_param);

    this.service.list(this.query_param).subscribe( result => {
        this.processing = false;

        if (result.resultStatus=='success'){
          this.items = JSON.parse(JSON.stringify(result.data));
          this.resume =  JSON.parse(JSON.stringify(result.resume));

          this.items.forEach((element, index) => {
            // Faz o mapeamento dos itens para adicionar à lista de seleção
            this.masterSelected = false;
            element.itm_deadline = this.toolsService.format_data_sql_br(element.itm_deadline);
            this.checkItems.push({id: (index+1), item: element, isSelected: false});
            // Aciona o evento de checagem dos itens
            this.getCheckedItemList();
          });

          // Emite o evento de listagem
          this.service.action = 'listing';
        }
        else
        {
          for (let i = 0; i < result.resultMessages.length; i++) {
            this.service.action = '';
            this.errors.push(result.resultMessages[i]);
          }
        }
      }, error => {
        this.processing = false;
        this.errors.push(error);
    });
  }

  // Seleciona ou deseleciona todos os itens
  checkUncheckAll() {
    for (var i = 0; i < this.checkItems.length; i++) {
      this.checkItems[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  // Informa se todos os itens estão selecionados
  isAllSelected() {
    this.masterSelected = this.checkItems.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  // Retorna os itens selecionados
  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.checkItems.length; i++) {
      if(this.checkItems[i].isSelected)
      this.checkedList.push(this.checkItems[i]);
    }
    return this.checkedList;
  }

  // Aprova os itens selecionados
  approveCheckedItems()
  {
    this.errors = [];
    this.processing = true;
    this.itemsToApprove = [];
    this.modalService.close('confirm-reopen-modal-request');

    // Se a lista de itens selecionados não estiver vazia, então aprovar esse selecionados
    if(this.getCheckedItemList().length != 0)
    {
      // Obtém os itens selecionados
      this.getCheckedItemList().forEach(element => {
        element.item.itm_deadline = this.toolsService.format_data_br_sql(element.item.itm_deadline);
        this.itemsToApprove.push(element.item);
      });

      // Manda itens para o serviço de aprovação, juntamente com o id da requisição
      this.service.approve(this.service.master_id, this.itemsToApprove, "technical").subscribe(response => {
        this.processing = false;

        // Se a solicitação foi efetivada com sucesso
        if(response.resultStatus == 'success')
        {
          this.toastr.success('Itens aprovados!', 'OK!');
          this.list();
        }
        // Caso contrário emitir erro
        else{
          for(let i=0; i<response.resultMessages.length; i++)
          {
            this.errors.push(response.resultMessages[i]);
          }
        }
      }, error => {
          this.processing = false;
          this.errors.push(error);
      });
    }
    // Caso contrário, emitir erro de que não há itens selecionados
    else{
      this.errors.push("Não há itens selecionados!");
      this.processing = false;
    }
  }

  // Rejeita os itens selecionados
  rejectCheckedItems()
  {
    this.errors = [];
    this.processing = true;
    this.itemsToReject = [];
    this.modalService.close('confirm-delete-modal-request');

    // Se a lista de itens selecionados não estiver vazia, então aprovar esse selecionados
    if(this.getCheckedItemList().length != 0)
    {
      // Obtém os itens selecionados
      this.getCheckedItemList().forEach(element => {
        element.item.itm_deadline = this.toolsService.format_data_br_sql(element.item.itm_deadline);
        this.itemsToReject.push(element.item);
      });

      // Manda itens para o serviço de aprovação, juntamente com o id da requisição
      this.service.rejection(this.service.master_id, this.itemsToReject, "technical").subscribe(response => {
        this.processing = false;

        // Se a solicitação foi efetivada com sucesso
        if(response.resultStatus == 'success')
        {
          this.toastr.success('Itens rejeitados!', 'OK!');
          this.list();
        }
        // Caso contrário emitir erro
        else{
          for(let i=0; i<response.resultMessages.length; i++)
          {
            this.errors.push(response.resultMessages[i]);
          }
        }
      }, error => {
          this.processing = false;
          this.errors.push(error);
      });
    }
    // Caso contrário, emitir erro de que não há itens selecionados
    else{
      this.errors.push("Não há itens selecionados!");
      this.processing = false;
    }
  }
}
