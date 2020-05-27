import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { API_URL } from '../../../core/api';
import { ObjResult } from '../../../shared/models/objresult.model';
import { map } from 'rxjs/operators';

@Injectable( { providedIn: 'root' } )
export class UserPermissionService{
  url : string = API_URL + '/UsersPermissions';
  action : string;

  edit_id = 0;
  master_id = 0;

  constructor( private http: HttpClient ) { }

  change_action_emitter = new EventEmitter<string>();

  change_action(action: string){
    this.action = action;
    this.change_action_emitter.emit(action);
  }

  //http service
  get_list_http(query_param_param): Observable<ObjResult>{
    return this.http.get<ObjResult>(this.url+'?param=' + JSON.stringify(query_param_param))
  }

  get_id_http(id : number): Observable<ObjResult>{
    return this.http.get<ObjResult>(this.url + '/' + id)
  }

  save_http(obj : any, id : any): Observable<ObjResult>{
    if (id==0){
      return this.http.post<ObjResult>(this.url, obj)
    }else{
      return this.http.put<ObjResult>(this.url, obj)
    }
  }

  delete_http(id : any): Observable<ObjResult>{
    return this.http.delete<ObjResult>(this.url + '/' + id)
  }

  saveCheck(obj): Observable<ObjResult>{
    return this.http.put<ObjResult>(this.url + '/savecheck',obj);
  }

  applyPerfil(obj): Observable<ObjResult>{
    return this.http.put<ObjResult>(this.url + '/applyperfil',obj);
  }

}
