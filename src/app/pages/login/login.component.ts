import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';
import { AuthService } from '../../core/authentication/auth.service';
import { JWModalService } from '../../shared/jwmodal';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  navigate_to: string;
  loginForm: FormGroup;
  resetForm: FormGroup;
  errors: string[];
  action: string;

  @ViewChild('username', {static: true}) username: ElementRef;

  constructor(
    private loginFormBuilder: FormBuilder,
    private resetFormBuilder: FormBuilder,
    private activitedRouter: ActivatedRoute,
    private platformDetectorService: PlatformDetectorService,
    private authService: AuthService,
    private modalService: JWModalService,
    private router: Router
    ) { }

  ngOnInit() {
    this.action = 'login';
    this.errors = [];
    this.navigate_to = this.activitedRouter.snapshot.params['to'] || '/';

    this.platformDetectorService.isPlatformBrowser() && this.username.nativeElement.focus();

    this.loginForm = this.loginFormBuilder.group({username: ['',Validators.required], password: ['',Validators.required]})
    this.resetForm = this.resetFormBuilder.group({user_reset: ['',Validators.required]})
  }

  login(){
    this.modalService.open('wait-modal');
    this.errors = [];

    const username = this.loginForm.get('username').value ;
    const password = this.loginForm.get('password').value ;

    this.authService.requestLogin(username, password).subscribe(
      result =>{
        this.modalService.close('wait-modal');
        if (result.resultStatus=='error'){
          for (let i = 0; i < result.resultMessages.length; i++) {
            console.log("Erro " + i + ": " + result.resultMessages[i]);
            this.errors.push(result.resultMessages[i]);
          }
        }
        if (result.resultStatus=='success'){
          console.log("Usuário logado com sucesso :) --> " + result.resultStatus);
          this.authService.set_user(result.data); //grava dados do usuario logado no local storage
        }
      },
      error => {
        this.modalService.close('wait-modal');
        this.errors.push(error);
      },
      () => {
        this.modalService.close('wait-modal');

        if (this.navigate_to.length <= 1){
          this.navigate_to = "/home";
        }

        this.router.navigate([this.navigate_to]); //redirect
      }
    )
  }
}
