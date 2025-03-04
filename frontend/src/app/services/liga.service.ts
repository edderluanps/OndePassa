import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Liga } from '../models/liga';

@Injectable({
  providedIn: 'root'
})
export class LigaService {

    private apiUrl = 'http://localhost:8080/';
  
    constructor(private http: HttpClient) {}
  
    getLigas(): Observable<Liga[]> {
      return this.http.get<Liga[]>(`${this.apiUrl}api/liga`);
    }
  
    getLigaById(id: number): Observable<Liga> {
      return this.http.get<Liga>(`${this.apiUrl}api/liga/${id}`);
    }

    getLigasPaises(): Observable<Liga[]> {
      return this.http.get<Liga[]>(`${this.apiUrl}api/liga/distinct-locais`);
    }
}
