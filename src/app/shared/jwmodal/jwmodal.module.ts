import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JWModalComponent } from './jwmodal.component';

@NgModule({
    imports: [CommonModule],
    declarations: [JWModalComponent],
    exports: [JWModalComponent]
})
export class JWModalModule { }