import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private apiUrl = 'http://172.22.59.201:9780/api/streaming/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const dataToSend = { email, contrasena: password };
    return this.http.post(`${this.apiUrl}/inicio/sesion`, dataToSend);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario`, user);
  }
}
