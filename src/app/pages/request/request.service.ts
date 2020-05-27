import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { API_URL } from '../../core/api';
import { ObjResult } from '../../shared/models/objresult.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  url: string = API_URL + '/Request';
  action: string;
  change_action_emitter = new EventEmitter<string>();

  // Essa variável guarda o registro que está sendo editado no momento
  edit_id = 0;
  master_id = 0;

  constructor(private http: HttpClient) { }

  // Modifica a ação atual
  changeAction(action: string){
    this.action = action;
    this.change_action_emitter.emit(action);
  }

  // Lista as requisições
  list(query_params): Observable<ObjResult>{
    return this.http.get<ObjResult>(this.url+'?param=' + JSON.stringify(query_params));
  }

  // Retorna uma requisição pelo id
  getById(id): Observable<ObjResult>{
    console.log(this.url+'/'+id);
    return this.http.get<ObjResult>(this.url+'/'+id);
  }

  // Cria uma nova requisição de compra
  save(request: any): Observable<ObjResult>{
    console.log(request);
    return this.http.post<ObjResult>(this.url, request);
  }

  // Atualiza uma determinada requisição
  update(id, request: any): Observable<ObjResult>{
    return this.http.put<ObjResult>(this.url+'/'+id, request);
  }

  // Finaliza e envia para aprovação a requisição atual
  finish(id: number, message: any): Observable<ObjResult>{
    return this.http.post<ObjResult>(this.url+'/'+id+'/send', message);
  }

  // Exclui uma determinada requisição
  delete(id: number): Observable<ObjResult>{
    return this.http.delete<ObjResult>(this.url+'/'+id);
  }

  // Reabre uma requisição
  reopen(id: number): Observable<ObjResult>{
    return this.http.put<ObjResult>(this.url+'/'+id+'/reopen', "");
  }
}
