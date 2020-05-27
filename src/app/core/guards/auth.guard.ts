import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { AuthService } from '../authentication/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../api';
import { ObjResult } from 'src/app/shared/models/objresult.model';

@Injectable()

export class AuthGuard implements CanLoad, CanActivate {
  url : string = API_URL + '/User';
  constructor(private http: HttpClient, private authService: AuthService){ }

  checkAuthentication (path: string): Observable<boolean> {
    return this.http.get<ObjResult>(this.url+'/validaToken').pipe(
      map(res => {
        if (res.resultStatus=='success') {
          return true;
        } else {
          this.authService.handleLogin(`/${path}`)
          return false;
        }
      }),
      catchError((err) => {
        console.log("erro => " + err)
        this.authService.handleLogin(`/${path}`)
        return of(false);
      })
    );
  }


  canLoad(route: Route): Observable<boolean> {
    return this.checkAuthentication(route.path);
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkAuthentication(activatedRoute.routeConfig.path);
  }

}
