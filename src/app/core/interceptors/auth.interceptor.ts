import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

import { AuthService } from '../authentication/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor{
     
    constructor (private authService: AuthService ){ }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        
        if (this.authService.has_user()){
            const authRequest = request.clone({setHeaders: {'Authorization':'Bearer ' + this.authService.get_token()}});
            return next.handle(authRequest);
        }else{
            return next.handle(request);
        }
    }

}