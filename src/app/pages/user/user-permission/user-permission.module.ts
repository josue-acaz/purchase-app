import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap';

import { SharedModule } from '../../../shared/shared.module';
import { UserPermissionService } from './user-permission.service';
import { UserPermissionComponent } from './user-permission.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule,
    SharedModule
  ],
  exports: [UserPermissionComponent],
  providers: [UserPermissionService],
  declarations: [UserPermissionComponent]
})
export class UserPermissionModule { }
