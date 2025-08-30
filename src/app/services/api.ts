// src/app/services/api.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
 
export interface LoginBody { email: string; password: string; }
export interface RegisterBody { name: string; email: string; password: string; }
export interface PlaceOrderBody { productId: number; quantity: number; }
 
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;   // 'cloth' | 'cosmetics' | 'footwear' | 'utensils' | 'mobiles'
  type?: string;      // 'general' | 'men' | 'women' | etc.
  imageUrl?: string;  // relative or absolute URL returned by backend
  sellerId?: number;
}
 
@Injectable({ providedIn: 'root' })
export class ApiService {
  /** Example: apiBase = https://localhost:7113/api , host = https://localhost:7113 */
  readonly base = environment.apiBase;
  readonly host = environment.apiHost;
 
  constructor(private http: HttpClient) {}
 
  // ---------- token helpers ----------
  setToken(token: string) { localStorage.setItem('token', token); }
  getToken(): string | null { return localStorage.getItem('token'); }
  clearToken() { localStorage.removeItem('token'); }
 
  private authHeaders(): HttpHeaders {
    const t = this.getToken();
    return new HttpHeaders({
      'Authorization': t ? `Bearer ${t}` : ''
    });
  }
 
  // ---------- Auth ----------
  login(body: LoginBody): Observable<{ token: string; role: string; }> {
    return this.http.post<{ token: string; role: string; }>(`${this.base}/Auth/login`, body);
  }
 
  register(body: RegisterBody): Observable<any> {
    return this.http.post<any>(`${this.base}/Auth/register`, body);
  }
 
  // ---------- Admin ----------
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/Admin/users`, { headers: this.authHeaders() });
  }
 
  getSellers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/Admin/sellers`, { headers: this.authHeaders() });
  }
 
  // ---------- Products (public/user) ----------
  /** Loads ALL products; use client-side filtering in the component. */
 getAllProducts() {
  return this.http.get<any[]>(`${this.base}/products`);
}
 
  /** Optional server filter if you decide to use it later */
  getProducts(category: string, type: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.base}/products/${encodeURIComponent(category)}/${encodeURIComponent(type)}`);
  }
 
  // ---------- Seller ----------
  /** Returns products created by the logged-in seller */
  myProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.base}/Seller/my-products`, { headers: this.authHeaders() });
  }
 
  /** Multipart upload to create a product; the file key must be `image` */
  addProductForm(fd: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.base}/Seller/add-product`, fd, { headers: this.authHeaders() });
  }
 
  // ---------- User (orders) ----------
 placeOrder(productId: number, quantity: number) {
    return this.http.post(`${this.base}/user/place-order`, { productId, quantity });
  }
 
  myOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/user/my-orders`);
  }
}
 