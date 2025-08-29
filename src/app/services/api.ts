import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiBase;
 
  constructor(private http: HttpClient) {}
 
  // Admin
  getUsers(){ return this.http.get<any[]>(`${this.base}/admin/users`); }
  getSellers(){ return this.http.get<any[]>(`${this.base}/admin/sellers`); }
 
  // Seller
  addProduct(p: any){ return this.http.post(`${this.base}/seller/add-product`, p); }
  myProducts(){ return this.http.get<any[]>(`${this.base}/seller/my-products`); }
 
  // User
  browse(category: string, type: string){ return this.http.get<any[]>(`${this.base}/products/category/${category}/${type}`); }
  placeOrder(productId: number, quantity: number){ return this.http.post(`${this.base}/user/place-order`, { productId, quantity }); }
}
 