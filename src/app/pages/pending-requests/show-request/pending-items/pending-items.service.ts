import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { API_URL } from '../../../../core/api';
import { ObjResult } from '../../../../shared/models/objresult.model';
import { map } from 'rxjs/operators';
import { retry } from 'rxjs-compat/operator/retry';
import { List } from 'lodash';
import { RequestItem } from '../../../request/request-edit/request-item/request-item.model';


@Injectable({
  providedIn: 'root'
})
export class PendingItemsService {

  action : string;
  url : string = API_URL + '/RequestItem';
  url_approval: string = API_URL + '/Approval';
  url_rejection: string = API_URL + '/Rejection';
  change_action_emitter = new EventEmitter<string>();

  show_id = 0; // É o id do item que está sendo mostrado
  master_id = 0; // É o id da requisição que está sendo mostrada

  constructor(private http: HttpClient) { }

  change_action(action: string){
    this.action = action;
    this.change_action_emitter.emit(action);
  }

  // Retorna um item pelo seu id
  getById(id): Observable<ObjResult>{
    return this.http.get<ObjResult>(this.url + '/' + id);
  }

  // Faz a listagem dos itens da requisição
  list(query_params): Observable<ObjResult>{
    return this.http.get<ObjResult>(this.url + '?param=' + JSON.stringify(query_params));
  }

  // Faz a aprovação dos itens da requisição
  approve(request_id: number, items: RequestItem[], type_of_approve: string): Observable<ObjResult>
  {
    console.log(items);
    return this.http.post<ObjResult>(this.url_approval + '/' + request_id + '/' +type_of_approve, items);
  }

  // Faz a rejeição dos itens da reequisição
  rejection(request_id: number, items: RequestItem[], type_of_reject: string): Observable<ObjResult>
  {
    return this.http.post<ObjResult>(this.url_rejection + '/' + request_id + '/' +type_of_reject, items);
  }

}
