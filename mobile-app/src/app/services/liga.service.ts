import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Liga } from '../models/liga';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LigaService {

  constructor(private http: HttpClient) {}
  
  getLigas(): Observable<Liga[]> {
    return this.http.get<Liga[]>(`${API_URL}api/liga`);
  }

  getLigaById(id: number): Observable<Liga> {
    return this.http.get<Liga>(`${API_URL}api/liga/${id}`);
  }

  getLigasPaises(): Observable<Liga[]> {
    return this.http.get<Liga[]>(`${API_URL}api/liga/distinct-locais`);
  }
}
