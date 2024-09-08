import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from './app-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public login(
    email: string,
    password: string,
  ): Observable<HttpResponse<AppResponse>> {
    return this.http.post<AppResponse>(
      `/api/auth/login`,
      { email, password },
      {
        observe: 'response',
        withCredentials: true,
      },
    );
  }
}
