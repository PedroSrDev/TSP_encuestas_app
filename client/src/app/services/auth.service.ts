import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AlertService } from './alert.service';
import { API_CONFIG } from '../core/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = API_CONFIG.baseUrl;

  constructor(private http: HttpClient, private alertService: AlertService) { }

  login(email: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { email: email }).pipe(
      tap(() => {
        this.alertService.success('Bienvenido', 'Has iniciado sesión correctamente.');
      })
    );
  }

  registerCompany(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register-company`, data);
  }
}
