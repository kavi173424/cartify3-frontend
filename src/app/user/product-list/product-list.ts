import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Product } from '../../services/api';
import { environment } from '../../../environments/environment';
 
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  // Inline HTML
  template: `
  <div class="card">
    <h2>Shop</h2>
 
    <!-- Filter form -->
    <form class="flex" (ngSubmit)="browse()">
      <select [(ngModel)]="category" name="category" required>
        <option value="cloth">cloth</option>
        <option value="cosmetics">cosmetics</option>
        <option value="footwear">footwear</option>
        <option value="utensils">utensils</option>
        <option value="mobiles">mobiles</option>
      </select>
 
      <select [(ngModel)]="type" name="type" required>
        <option value="general">general</option>
        <option value="men">men</option>
        <option value="women">women</option>
        <option value="western">western</option>
        <option value="traditional">traditional</option>
        <option value="pant">pant</option>
        <option value="shirt">shirt</option>
      </select>
 
      <button class="secondary" type="submit">Browse</button>
      <button type="button" (click)="loadAll()">All</button>
    </form>
 
    <!-- List -->
    <ng-container *ngIf="products?.length; else empty">
      <div class="list">
        <div class="item" *ngFor="let p of products">
          <img [src]="img(p.imageUrl)" alt="" />
          <b>{{ p.name }}</b>
          <div class="badge">₹ {{ p.price }}</div>
          <div class="badge">{{ p.category }}</div>
          <div class="badge">{{ p.type || 'general' }}</div>
          <button class="primary" (click)="addToCart(p)">Add to Cart</button>
        </div>
      </div>
    </ng-container>
 
    <ng-template #empty>
      <p style="color:#9ca3af;margin-top:8px">No products found. Try a different filter or click “All”.</p>
    </ng-template>
  </div>
  `,
  // Minimal styles
  styles: [`
    .card{ background:#0b1220; color:#fff; padding:16px; border-radius:12px }
    .flex{ display:flex; gap:8px; margin:8px 0 }
    select,button{ padding:8px 10px; border-radius:8px; border:1px solid #243045; background:#0f1a2b; color:#dbe5ff }
    button.primary{ background:#22c55e; border:0; color:#06210f; font-weight:600 }
    button.secondary{ background:#2196f3; border:0; color:#061322; font-weight:600 }
    .list{ display:grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap:16px; margin-top:12px }
    .item{ background:#0f1a2b; border:1px solid #243045; padding:10px; border-radius:10px }
    .item img{ width:100%; height:140px; object-fit:cover; background:#122 }
    .badge{ display:inline-block; margin-right:6px; margin-top:6px; font-size:12px; color:#9ca3af }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  category = 'cloth';
  type = 'general';
 
  constructor(private api: ApiService) {}
 
  ngOnInit() { this.loadAll(); }
 
  /** Prefix relative image URLs with apiHost */
  img(url?: string): string {
    if (!url) return 'https://via.placeholder.com/400x300?text=No+Image';
    return /^https?:\/\//i.test(url) ? url : `${environment.apiHost}${url}`;
  }
 
  /** Load everything */
  loadAll() {
    this.api.getAllProducts().subscribe({
      next: res => this.products = res || [],
      error: _ => this.products = []
    });
  }
 
  /** Apply filters (category + type) */
  browse() {
  if (this.category === 'all') {
    this.api.getAllProducts().subscribe(res => this.products = res);
  } else {
    this.api.getProducts(this.category, this.type).subscribe(res => this.products = res);
  }
}
 
  /** Very simple cart backed by localStorage (same as before) */
  private readCart(): any[] { try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; } }
  private writeCart(items: any[]) { localStorage.setItem('cart', JSON.stringify(items)); }
 
  addToCart(p: any) {
  const cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const found = cart.find(i => i.id === p.id);
  if (found) {
    found.qty += 1;            // increment if already in cart
  } else {
    cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart');
}
}
 