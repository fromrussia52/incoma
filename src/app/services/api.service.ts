import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUrl: string = 'https://www.googleapis.com/books/v1/volumes';

    constructor(
        private http: HttpClient
    ) { }

    search(value: string, limit: number, offset: number): Observable<HttpResponse<Object>> {
        return this.http.get(this.apiUrl, {
            params: new HttpParams({
                fromObject: {
                    q: value,
                    maxResults: String(limit),
                    startIndex: String(offset)
                }
            }),
            observe: 'response',
            responseType: 'json'
        });
    }
}
