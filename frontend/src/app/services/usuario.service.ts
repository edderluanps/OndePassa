import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../models/usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}api/usuario`);
  }

  getUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}api/usuario/${id}`);
  }

  getByEmail(email: string): Observable<UsuarioDTO> {
    const encodedEmail = encodeURIComponent(email);
    return this.http.get<UsuarioDTO>(`${this.apiUrl}api/usuario/email?value=${encodedEmail}`);
  }
}