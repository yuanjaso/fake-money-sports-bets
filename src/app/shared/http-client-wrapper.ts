import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type QueryParams = {
  [param: string]: string | string[];
};

@Injectable({
  providedIn: 'root',
})
export class HttpClientWrapper {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, params?: QueryParams): Observable<T> {
    return this.httpClient.get<T>(`${environment.apiURL}${url}`, { params });
  }

  post<T>(url: string, body: any | null, params?: QueryParams): Observable<T> {
    return this.httpClient.post<T>(`${environment.apiURL}${url}`, body, {
      params,
    });
  }

  patch<T>(url: string, body: any | null, params?: QueryParams): Observable<T> {
    return this.httpClient.patch<T>(`${environment.apiURL}${url}`, body, {
      params,
    });
  }

  delete<T>(url: string, params?: QueryParams): Observable<T> {
    return this.httpClient.delete<T>(`${environment.apiURL}${url}`, { params });
  }
}
