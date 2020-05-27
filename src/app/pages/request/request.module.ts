import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap';

import { SharedModule } from '../../shared/shared.module';

import { RequestComponent } from './request.component';
import { RequestEditComponent } from './request-edit/request-edit.component';
import { RequestItemComponent } from './request-edit/request-item/request-item.component';
import { RequestItemEditComponent } from './request-edit/request-item/request-item-edit/request-item-edit.component';

const ROUTES: Routes = [{path: '', component: RequestComponent}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [],

  declarations: [RequestComponent, RequestEditComponent, RequestItemComponent, RequestItemEditComponent]
})
export class RequestModule { }
