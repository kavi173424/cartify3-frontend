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
    <div class="list">
      <div class="item" *ngFor="let p of items">
        <img [src]="p.imageUrl || 'https://via.placeholder.com/400x300?text='+p.name" />
        <b>{{p.name}}</b>
        <div class="badge">₹ {{p.price}}</div>
        <div class="badge">{{p.category}}</div>
        <div class="badge">{{p.type}}</div>
        <button (click)="addToCart(p)">Add to Cart</button>
      </div>
    </div>
  </div>`
})
export class ProductListComponent {
  category='cloth'; type='men'; items:any[]=[];
  constructor(private api: ApiService, private router: Router){}
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
 