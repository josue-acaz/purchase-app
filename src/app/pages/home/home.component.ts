import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AuthService } from 'src/app/core/authentication/auth.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

}
