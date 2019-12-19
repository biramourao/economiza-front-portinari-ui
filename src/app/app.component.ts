import { Component } from '@angular/core';

import { PoMenuItem } from '@portinari/portinari-ui';
import { AuthService } from './auth/auth-service.service';
import { TokenStorageService } from './auth/token-storage.service';
import { ApiService } from './api.service';
import { Usuario } from './model/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuario = new Usuario();
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private apiService: ApiService){
    this.getUsuario();
  }
  readonly menus: Array<PoMenuItem> = [
    { label: 'Usuário', action: this.onClick.bind(this), icon: 'po-icon-user', shortLabel: 'Usuário' },
    { label: 'Fontes de Renda', action: this.onClick.bind(this), icon: 'po-icon po-icon-finance-secure', shortLabel: 'Rendas' },
    { label: 'Gastos', action: this.onClick.bind(this), icon: 'po-icon po-icon-finance', shortLabel: 'Gastos' },
    { label: 'Categ. de Gasto', action: this.onClick.bind(this), icon: 'po-icon po-icon-list', shortLabel: 'Cat. Gastos' },
    { label: 'Sair', action: this.logout.bind(this), icon: 'po-icon po-icon-exit', shortLabel: 'Sair' }
  ];

  private onClick() {
    alert('Clicked in menu item')
  }
  isAuth() {
    return this.authService.isAuthenticated();
  }
  getUsuario() {
    this.apiService.getUsuario().subscribe(
      data => {
        this.usuario = data as unknown as Usuario;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  logout() {
    this.tokenStorage.signOut();
  }

  

}
