import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessLogDTO } from '../models/access-log.dto';

@Injectable({
  providedIn: 'root'
})
export class AccessLogService {

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  logAccess(): Observable<any> {
    const path = "/listagem";
    return this.http.post(`${this.apiUrl}api/logs?route=${encodeURIComponent(path)}`, {}, {
      responseType: 'text'
    }
    );
  }

  getContagemAcessosDoDia(): Observable<AccessLogDTO> {
    return this.http.get<AccessLogDTO>(`${this.apiUrl}api/logs/hoje/contagem`);
  }

  getContagemTotalAcessos(): Observable<AccessLogDTO> {
    return this.http.get<AccessLogDTO>(`${this.apiUrl}api/logs/contagem`);
  }

}
