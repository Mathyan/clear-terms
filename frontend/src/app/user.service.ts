import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendSet } from './backend-set';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private backendSet: BackendSet,
  ) {}
  private jwtToken: string | null = null;
  public login(email: string, password: string) {
    try {
      this.http.post(`${this.backendSet}/auth/login`, `${}` );
    } catch (error) {}
  }
  public logout() {
    this.jwtToken = null;
  }
}
