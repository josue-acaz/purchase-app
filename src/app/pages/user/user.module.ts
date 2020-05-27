import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap';

import { SharedModule } from '../../shared/shared.module';
import { UserPermissionModule } from './user-permission/user-permission.module';
import { UserService } from './user.service';
import { UserComponent } from './user.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const ROUTES: Routes = [{path: '', component: UserComponent}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule,
    SharedModule,
    UserPermissionModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [UserService],

  declarations: [UserComponent, UserEditComponent]
})
export class UserModule { }
