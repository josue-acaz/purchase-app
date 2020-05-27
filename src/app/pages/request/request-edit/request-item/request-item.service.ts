import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { API_URL } from '../../../../core/api';
import { ObjResult } from '../../../../shared/models/objresult.model';
import { map } from 'rxjs/operators';
import { retry } from 'rxjs-compat/operator/retry';

@Injectable( { providedIn: 'root' } )
export class RequestItemService{
  url : string = API_URL + '/RequestItem';
  action : string;

  edit_id = 0;
  master_id = 0;
  master_status = '';

  constructor( private http: HttpClient ) { }

  change_action_emitter = new EventEmitter<string>();

  change_action(action: string){
    this.action = action;
    this.change_action_emitter.emit(action);
  }

  // Faz a listagem dos itens de uma requisição
  list(query_params): Observable<ObjResult>{
    return this.http.get<ObjResult>(this.url + '?param=' + JSON.stringify(query_params));
  }

  getById(id): Observable<ObjResult>{
    return this.http.get<ObjResult>(this.url + '/' + id);
  }

  save(requestItem: any): Observable<ObjResult>{
    console.log(requestItem);
    return this.http.post<ObjResult>(this.url, requestItem);
  }

  update(id, request_item: any): Observable<ObjResult>{
    return this.http.put<ObjResult>(this.url + '/' + id, request_item);
  }

  // Exclui um determinado item da requisição
  delete(id): Observable<ObjResult>{
    return this.http.delete<ObjResult>(this.url + '/' + id);
  }

  // Fornecer o id da requisição para obeter os seguintes dados: prioridade, data limite e aplicação
  getRequestDependencies(id): Observable<ObjResult>{
    return this.http.get<ObjResult>(this.url + '/' + id + '/requestDependencies');
  }

  // Filtra os resultados de busca de um determinado item
  filterResults(token: string){
    return this.http.get(this.url + '/autocomplete?search=' + token)
      .pipe(map((results: any[]) => results.filter(res => res.itm_pn.toLowerCase().indexOf(token.toLowerCase()) > -1)));
  }
}
