import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendSet } from './backend-set';
import { AppResponse } from './app-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private backendSet: BackendSet,
  ) {}

  public login(
    email: string,
    password: string,
  ): Observable<HttpResponse<AppResponse>> {
    return this.http.post<AppResponse>(
      `${this.backendSet.getBackend()}/auth/login`,
      { email, password },
      {
        observe: 'response',
        withCredentials: true,
      },
    );
  }
}
