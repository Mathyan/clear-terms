import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { UserRegister } from './user-register';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public updateUser(updatedUser: User) {
    return this.http.post<User>('api/users/modify', updatedUser, {
      withCredentials: true,
    });
  }
  constructor(private http: HttpClient) {}

  public login(
    email: string,
    password: string,
  ): Observable<HttpResponse<string>> {
    return this.http.post<string>(
      `/api/auth/login`,
      { email, password },
      {
        observe: 'response',
        withCredentials: true,
      },
    );
  }

  public getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`/api/users/${userId}`, {
      withCredentials: true,
    });
  }

  public logout(): Observable<HttpResponse<string>> {
    return this.http.post<string>(
      `/api/auth/logout`,
      {},
      {
        observe: 'response',
        withCredentials: true,
      },
    );
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(`/api/users/me`, {
      withCredentials: true,
    });
  }
  public register(userRegister: UserRegister): Observable<HttpResponse<User>> {
    return this.http.post<User>(`/api/users/create`, userRegister, {
      observe: 'response',
      withCredentials: true,
    });
  }
}
