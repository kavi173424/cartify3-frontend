import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt';
  private roleKey = 'role';
  private api = environment.apiBase + '/auth';
 
  constructor(private http: HttpClient) {}
 
  register(data: {name:string,email:string,password:string,role:string}) {
    return this.http.post<any>(`${this.api}/register`, data);
  }
  login(data: {email:string,password:string}) {
    return this.http.post<any>(`${this.api}/login`, data);
  }
 
  saveAuth(token: string, role: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.roleKey, role);
  }
  token(){ return localStorage.getItem(this.tokenKey); }
  role(){ return localStorage.getItem(this.roleKey); }
  logout(){ localStorage.clear(); }
}
 