import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../core/config/api.config';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private apiUrl = `${API_CONFIG.baseUrl}/users`;

    constructor(private http: HttpClient) { }

    getUsers(search?: string): Observable<any> {
        let params = new HttpParams();
        if (search) {
            params = params.append('search', search);
        }
        return this.http.get(this.apiUrl, { params });
    }

    createUser(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }

    updateUser(id: number | string, data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }

    deleteUser(id: number | string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
