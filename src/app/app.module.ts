import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule, PoLoginComponent } from '@portinari/portinari-ui';
import { RouterModule } from '@angular/router';
import { ApiService } from './api.service';
import { AuthGuard } from './auth/auth.guard';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpErrorInterceptor } from './auth/httperrorinterceptor';
import { AuthInterceptor } from './auth/auth-interceptor';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PoFieldModule } from '@portinari/portinari-ui';
import { GastosComponent } from './gastos/gastos.component';
import { PoPageModule } from '@portinari/portinari-ui';
import { PoPageLoginModule, PoModalPasswordRecoveryComponent } from '@portinari/portinari-templates';
import { IndicadoresComponent } from './indicadores/indicadores.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GastosComponent,
    IndicadoresComponent,

  ],
  imports: [
    BrowserModule,
    PoModule,
    RouterModule.forRoot([]),
    FormsModule,
    PoFieldModule,
    routing,
    PoPageModule
    
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
