import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private apiUrl = 'http://localhost:9780/api/streaming'; // URL de tu API
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('currentUser'));
    this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  iniciarSesion(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/iniciar/sesion`, user).pipe(
      map(response => {
        // Guardar usuario en local storage y actualizar BehaviorSubject
        if (response.usuario) {
          localStorage.setItem('currentUser', JSON.stringify(response.usuario));
          this.currentUserSubject.next(response.usuario);
          this.isAuthenticatedSubject.next(true);
        }
        return response;
      })
    );
  }

  registro(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/usuario`, user)
  }

  creacionCanal(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/canal`, user)
  }

  logout() {
    // Eliminar usuario del local storage y actualizar BehaviorSubject
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  buscarCanales(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/canal/buscar/all`);
  }

  getCanalById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/canal/${id}`);
  }

  uploadProfilePicture(userId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('foto-perfil', file);

    return this.http.post(`${this.apiUrl}/img/${userId}/foto-perfil`, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }

  getProfilePicture(userId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/img/${userId}/foto-perfil`, { responseType: 'blob' });
  }

}
