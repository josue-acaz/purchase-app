import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap';

import { SharedModule } from '../../shared/shared.module';

import { PendingRequestsComponent } from './pending-requests.component';
import { ShowRequestComponent } from './show-request/show-request.component';
import { PendingItemsComponent } from './show-request/pending-items/pending-items.component';


const ROUTES: Routes = [{path: '', component: PendingRequestsComponent}];

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

  declarations: [PendingRequestsComponent, ShowRequestComponent, PendingItemsComponent]
})
export class PendingRequestsModule { }
