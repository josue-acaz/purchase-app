import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { API_URL } from '../../core/api';
import { ObjResult } from '../../shared/models/objresult.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  url : string = API_URL + '/User';
  action : string;
  edit_id = 0;
  master_id = 0;
  change_action_emitter = new EventEmitter<string>();

  constructor( private http: HttpClient ) { }

  change_action(action: string){
    this.action = action;
    this.change_action_emitter.emit(action);
  }

  // Lista os usuários consultados
  list(query_param_param): Observable<ObjResult>{
    return this.http.get<ObjResult>(this.url+'?param=' + JSON.stringify(query_param_param))
  }

  // Retorna os dados de determinado usuário
  getById(id : number): Observable<ObjResult>{
    return this.http.get<ObjResult>(this.url + '/' + id)
  }

  // Cria um novo usuário
  save(obj : any, id : any): Observable<ObjResult>{
    if (id==0){
      return this.http.post<ObjResult>(this.url, obj)
    }else{
      return this.http.put<ObjResult>(this.url, obj)
    }
  }

  // Exclui um usuário
  delete(id : any): Observable<ObjResult>{
    return this.http.delete<ObjResult>(this.url + '/' + id)
  }

  // Filtra os resultados de busca por usuário
  filter_results(token: string) {
    return this.http.get(this.url + '/autocomplete?search=' + token)
      .pipe(map((results: any[]) => results.filter(res => res.ent_name.toLowerCase().indexOf(token.toLowerCase()) > -1)));
  }

}
