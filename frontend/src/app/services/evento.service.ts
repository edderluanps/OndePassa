import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

    private apiUrl = 'http://localhost:8080/';
  
    constructor(private http: HttpClient) {}
  
    getEventos(): Observable<Evento[]> {
      return this.http.get<Evento[]>(`${this.apiUrl}api/evento`);
    }
  
    getEventoById(id: number): Observable<Evento> {
      return this.http.get<Evento>(`${this.apiUrl}api/evento/${id}`);
    }

    getEventoByLocal(local: string): Observable<Evento[]> {
      return this.http.get<Evento[]>(`${this.apiUrl}api/evento/bylocal?local=${local}`);
    }
}
