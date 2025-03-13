import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}api/evento`);
  }

  getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}api/evento/${id}`);
  }

  getEventoByLocal(local: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}api/evento/bylocal?local=${local}`);
  }

  postEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this.apiUrl}api/evento`, evento);
  }

  putEvento(id: number, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}api/evento/${id}`, evento);
  }

  deleteEvento(id: number): Observable<Evento> {
    return this.http.delete<Evento>(`${this.apiUrl}api/evento/${id}`);
  }
}
