import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../core/config/api.config';

@Injectable({
    providedIn: 'root'
})
export class SurveysService {
    private apiUrl = `${API_CONFIG.baseUrl}/surveys`;

    constructor(private http: HttpClient) { }

    getSurveys(params?: any): Observable<any> {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    httpParams = httpParams.append(key, params[key]);
                }
            });
        }
        return this.http.get(this.apiUrl, { params: httpParams });
    }

    createSurvey(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }

    getSurveyResults(id: number | string, params?: any): Observable<any> {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    httpParams = httpParams.append(key, params[key]);
                }
            });
        }
        return this.http.get(`${this.apiUrl}/${id}/results`, { params: httpParams });
    }
}
