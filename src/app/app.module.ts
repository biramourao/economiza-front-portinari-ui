import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ApiService } from './api.service';
import { AuthGuard } from './auth/auth.guard';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpErrorInterceptor } from './auth/httperrorinterceptor';
import { AuthInterceptor } from './auth/auth-interceptor';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { GastosComponent } from './gastos/gastos.component';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { FormGastosComponent } from './form-gastos/form-gastos.component';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import {PoFieldModule, PoModule, PoPageModule, PoTableModule} from "@po-ui/ng-components";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GastosComponent,
    IndicadoresComponent,
    FormGastosComponent
  ],
  imports: [
    BrowserModule,
    PoModule,
    RouterModule.forRoot([]),
    FormsModule,
    PoFieldModule,
    routing,
    PoPageModule,
    PoTableModule,
    PoTemplatesModule


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
