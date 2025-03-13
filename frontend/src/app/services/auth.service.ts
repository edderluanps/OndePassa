import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredenciaisDTO } from '../login/credenciais.dto';
import { StorageService } from './storage.service';
import { LocalUser } from '../login/local_user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/';

  constructor(
    private httpClient: HttpClient,
    public storage : StorageService,
    private router: Router,
  ) { }
 
  authenticate(credenciais: CredenciaisDTO){
    return this.httpClient.post(`${this.apiUrl}login`, credenciais, {
      observe: 'response',
      responseType: 'text'
    });
  }

  successfulLogin(authorizationValue : string){
    let tok = authorizationValue.substring(7);
    let user : LocalUser = {
      token: tok
    };
    this.storage.setLocalUser(user);
  }

  logout(){
    this.storage.setLocalUser(null);
    this.router.navigate(['/login']);
  }

}
