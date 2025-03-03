import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transmissao } from '../models/transmissao';

@Injectable({
  providedIn: 'root'
})
export class TransmissaoService {

    private apiUrl = 'http://localhost:8080/';
  
    constructor(private http: HttpClient) {}
  
    getTransmissoes(): Observable<Transmissao[]> {
      return this.http.get<Transmissao[]>(`${this.apiUrl}api/transmissao`);
    }
  
    getTransmissaoById(id: number): Observable<Transmissao> {
      return this.http.get<Transmissao>(`${this.apiUrl}api/transmissao/${id}`);
    }
}
