import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) { }

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${API_URL}api/evento`);
  }

  getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${API_URL}api/evento/${id}`);
  }

  getEventoByLocal(local: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${API_URL}api/evento/bylocal?local=${local}`);
  }

  getEventosDoDia(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${API_URL}api/evento/hoje`);
  }
}
