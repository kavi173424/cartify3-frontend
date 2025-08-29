import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
 
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="card">
    <h2>Cart</h2>
    <div class="list">
      <div class="item" *ngFor="let it of cart">
        <b>{{it.name}}</b>
        <div>Qty: {{it.qty}}</div>
        <div class="badge">₹ {{it.price}}</div>
        <div>Total: ₹ {{it.qty * it.price}}</div>
        <button class="warn" (click)="remove(it.id)">Remove</button>
      </div>
    </div>
    <div class="flex" style="margin-top:12px">
      <div><b>Grand Total: ₹ {{total()}}</b></div>
      <button class="primary" (click)="purchase()">Purchase</button>
    </div>
  </div>`
})
export class CartComponent {
  cart:any[] = JSON.parse(localStorage.getItem('cart')||'[]');
  constructor(private api: ApiService){}
  remove(id:number){ this.cart = this.cart.filter(x=>x.id !== id); localStorage.setItem('cart', JSON.stringify(this.cart)); }
  total(){ return this.cart.reduce((s,it)=> s + it.price*it.qty, 0); }
  purchase(){
    if(this.cart.length===0){ alert('Cart empty'); return; }
    Promise.all(this.cart.map(it => this.api.placeOrder(it.id, it.qty).toPromise()))
      .then(()=>{ alert('Purchase successful'); this.cart=[]; localStorage.setItem('cart','[]'); })
      .catch(err=> alert('Purchase failed: '+(err?.error?.error || err.message)));
  }
}
 