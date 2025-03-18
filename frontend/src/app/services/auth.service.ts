import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredenciaisDTO } from '../login/credenciais.dto';
import { StorageService } from './storage.service';
import { LocalUser } from '../login/local_user';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper: JwtHelperService = new JwtHelperService();

  private apiUrl = 'http://localhost:8080/';

  constructor(
    private httpClient: HttpClient,
    public storageService: StorageService,
    private router: Router,
  ) { }

  authenticate(credenciais: CredenciaisDTO) {
    return this.httpClient.post(`${ this.apiUrl }login`, credenciais, {
      observe: 'response',
      responseType: 'text'
    });
  }

  successfulLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7);
    let user: LocalUser = {
      token: tok, email: this.jwtHelper.decodeToken(tok).sub
    };
    this.storageService.setLocalUser(user);
  }

  logOut(){
    let user : LocalUser = {
      token: '',
      email: ''
    }
    this.storageService.setLocalUser(user);
  }

}