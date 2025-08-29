import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
  <nav style="display:flex;justify-content:space-between;align-items:center;background:#0b1220;padding:12px 16px;color:#e5e7eb">
    <a routerLink="/" style="color:#e5e7eb;text-decoration:none;font-weight:700">Cartify</a>
    <div>
      <button *ngIf="auth.role()==='Seller'" routerLink="/seller/dashboard">Seller</button>
      <button *ngIf="auth.role()==='Admin'" routerLink="/admin/dashboard">Admin</button>
      <button *ngIf="auth.role()==='User'||auth.role()==='Admin'" routerLink="/shop">Shop</button>
      <button *ngIf="auth.role()==='User'||auth.role()==='Admin'" routerLink="/cart">Cart ({{cartCount}})</button>
      <button *ngIf="auth.token()" (click)="logout()">Logout</button>
    </div>
  </nav>
  <div class="container"><router-outlet></router-outlet></div>
  `
})
export class AppComponent {
  cartCount = 0;
  constructor(public auth: AuthService, private router: Router) {
    this.updateCartCount();
    window.addEventListener('storage', () => this.updateCartCount());
  }
  updateCartCount(){ this.cartCount = JSON.parse(localStorage.getItem('cart')||'[]').length; }
  logout(){ this.auth.logout(); this.router.navigateByUrl('/'); }
}
 