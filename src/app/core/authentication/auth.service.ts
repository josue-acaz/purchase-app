import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { API_URL } from '../api';
import { ObjResult } from '../../shared/models/objresult.model';
import { environment } from '../../../environments/environment';
import { map, tap, last, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  url : string = API_URL + '/User';
  isLogged2: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  requestLogin(username: string, password: string): Observable<ObjResult>{
    const myheader = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
    var data = { username: username ,password: password, system_flag: environment.system_flag };
    return this.http.post<ObjResult>(API_URL+'/user/authenticate', data, {headers: myheader});
  }

  requestReset(obj: Object): Observable<ObjResult>{
    const myheader = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
    return this.http.put<ObjResult>(API_URL+'/user/resetpassword', obj, {headers: myheader});
  }

  isLogged(){
    return this.has_user();
  }

  handleLogin(path?: string){
    this.router.navigate(['/login', path])
  }

  has_user():boolean {
    return !!this.get_user();
  }

  set_user(user){
    window.localStorage.setItem('uloged', JSON.stringify(user));
  }

  get_user():object {
    return JSON.parse(window.localStorage.getItem('uloged'))  ;
  }

  remove_user () {
    window.localStorage.removeItem('uloged');
  }

  get_token(): string {
      let obj = JSON.parse(window.localStorage.getItem('uloged'));
      return obj.token;
  }

  get_date(): string {
    let obj = JSON.parse(window.localStorage.getItem('uloged'));
    return obj.date;
  }

}
