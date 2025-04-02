import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const api = '/33491968/hong/api/v1';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: boolean = false;

  constructor(private http: HttpClient) { }

  checkAuth() {
    return this.auth;
  }

  authenticate() {
    this.auth = true;
  }

  registerUser(user: any) {
    return this.http.post(`${api}/register`, user);
  }

  loginUser(user: any) {
    return this.http.post(`${api}/login`, user);
  }
}
