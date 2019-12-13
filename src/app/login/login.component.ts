import { Component, OnInit } from '@angular/core';
import { AuthLoginInfo } from '../auth/auth-login-info';
import { AuthService } from '../auth/auth-service.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  usuarioTemp = new AuthLoginInfo('', '');
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  login() {
    this.authService.attemptAuth(this.usuarioTemp).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
      },
      error => {
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage() {
    window.location.reload();
  }

}
