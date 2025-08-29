import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <h2>Shop</h2>
    <form class="flex" (ngSubmit)="browse()">
      <select [(ngModel)]="category" name="category">
        <option value="cloth">cloth</option>
        <option value="cosmetics">cosmetics</option>
        <option value="footwear">footwear</option>
        <option value="utensils">utensils</option>
        <option value="mobiles">mobiles</option>
      </select>
      <select [(ngModel)]="type" name="type">
        <!-- keep 'general' default so items without a special type appear -->
        <option value="general">general</option>
        <option value="men">men</option>
        <option value="women">women</option>
        <option value="western">western</option>
        <option value="traditional">traditional</option>
        <option value="pant">pant</option>
        <option value="shirt">shirt</option>
      </select>
      <button class="secondary">Browse</button>
      <button type="button" (click)="gotoCart()">Cart</button>
    </form>
 
    <ng-container *ngIf="items?.length; else empty">
      <div class="list">
        <div class="item" *ngFor="let p of items">
          <img [src]="p.imageUrl || p.__localImage || 'https://via.placeholder.com/400x300?text='+p.name" />
          <b>{{p.name}}</b>
          <div class="badge">₹ {{p.price}}</div>
          <div class="badge">{{p.category}}</div>
          <div class="badge">{{p.type || 'general'}}</div>
          <button (click)="addToCart(p)">Add to Cart</button>
        </div>
      </div>
    </ng-container>
    <ng-template #empty>
      <p style="color:#9ca3af;margin-top:8px">No products found. Try a different type (e.g. "general").</p>
    </ng-template>
  </div>`
})
export class ProductListComponent {
  category='mobiles'; // start where you need
  type='general';
  items:any[]=[];
  constructor(private api: ApiService, private router: Router){
    this.browse(); // load on first view
  }
  browse(){ this.api.browse(this.category, this.type).subscribe(r=> this.items = r); }
  addToCart(p:any){
    const cart = JSON.parse(localStorage.getItem('cart')||'[]');
    const found = cart.find((x:any)=> x.id===p.id);
    if(found) found.qty += 1; else cart.push({ id:p.id, name:p.name, price:p.price, qty:1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
  }
  gotoCart(){ this.router.navigateByUrl('/cart'); }
}
 