import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@portinari/portinari-ui';
import { RouterModule } from '@angular/router';
import { ApiService } from './api.service';
import { AuthGuard } from './auth/auth.guard';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpErrorInterceptor } from './auth/httperrorinterceptor';
import { AuthInterceptor } from './auth/auth-interceptor';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PoPageLoginModule, PoModalPasswordRecoveryComponent } from '@portinari/portinari-templates';
import { PoFieldModule } from '@portinari/portinari-ui';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    FormsModule,
    PoFieldModule
  ],
  providers: [
    ApiService,
    AuthGuard,
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
