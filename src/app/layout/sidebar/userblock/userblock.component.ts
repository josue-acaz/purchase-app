import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html'
})
export class UserblockComponent implements OnInit {
    user: object;
    picture:string;
    constructor(public userblockService: UserblockService, public authService: AuthService) {
        this.user = this.authService.get_user();
        this.picture = 'assets/img/user/01.jpg'
    }

    ngOnInit() {
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

}
