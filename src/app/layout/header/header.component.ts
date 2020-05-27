import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { SettingsService } from '../../core/settings/settings.service';
import { MenuService } from '../../core/menu/menu.service';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    navCollapsed = true; // for horizontal layout
    menuItems = []; // for horizontal layout
    router: Router;

    constructor(
        public menu: MenuService,
        public settings: SettingsService,
        public injector: Injector,
        public  authService: AuthService
    ) {

      // show only a few items on demo
      this.menuItems = menu.getMenu().slice(0, 4); // for horizontal layout

    }

    ngOnInit() {
      this.router = this.injector.get(Router);

      // Autoclose navbar on mobile when route change
      this.router.events.subscribe((val) => {
          // scroll view to top
          window.scrollTo(0, 0);
          // close collapse menu
          this.navCollapsed = true;
      });
    }

    toggleOffsidebar() {
      this.settings.toggleLayoutSetting('offsidebarOpen');
    }

    toggleCollapsedSideabar() {
      this.settings.toggleLayoutSetting('isCollapsed');
    }

    isCollapsedText() {
      return this.settings.getLayoutSetting('isCollapsedText');
    }

    logout(){
      this.authService.remove_user();
      this.router.navigate(['/login']); // redirect to login page
    }

    pendingRequests(){
      this.router.navigate(['/pendingrequests']); // redirect to pendingrequests page
    }
}
