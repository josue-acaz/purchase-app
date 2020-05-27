import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { LoginModule } from './pages/login/login.module';
import { AuthGuard } from './core/guards/auth.guard';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule, // required for ng2-tag-input
        CoreModule,
        HttpClientModule,
        LoginModule,
        LayoutModule,
        SharedModule.forRoot(),
        RoutesModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi:true},
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
        AuthGuard ],
    bootstrap: [AppComponent]
})
export class AppModule { }
