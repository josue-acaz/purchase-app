import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { API_URL } from '../../core/api';
import { ObjResult } from '../../shared/models/objresult.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PendingRequestsService {

  action: string;
  url: string = API_URL + '/Request';
  change_action_emitter = new EventEmitter<string>();
  show_id = 0; // É a requisição que está sendo exibida naquele momento

  constructor(private http: HttpClient) { }

  changeAction(action: string){
    this.action = action;
    this.change_action_emitter.emit(action);
  }

  // Lista as requisições
  list(query_params): Observable<ObjResult>{
    return this.http.get<ObjResult>(this.url+'?param=' + JSON.stringify(query_params));
  }

  // Retorna a requisição pelo id
  getById(id: number): Observable<ObjResult>{
    return this.http.get<ObjResult>(this.url+'/'+id);
  }

}
