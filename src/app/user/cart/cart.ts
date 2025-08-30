import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
 
type CartItem = { id:number; name:string; price:number; qty:number };
 
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="card">
    <h2>Cart</h2>
 
    <div class="item" *ngFor="let it of cart; let i = index">
      <b>{{it.name}}</b>
      <div>₹ {{it.price}}</div>
      <div>
        Qty:
        <button (click)="dec(i)">-</button>
        {{it.qty}}
        <button (click)="inc(i)">+</button>
      </div>
      <div>Total: ₹ {{it.price * it.qty}}</div>
      <button class="warn" (click)="remove(i)">Remove</button>
    </div>
 
    <div class="flex" style="margin-top:12px">
      <div><b>Grand Total: ₹ {{total()}}</b></div>
      <button class="primary" (click)="purchase()" [disabled]="busy">
        {{ busy ? 'Purchasing…' : 'Purchase' }}
      </button>
      <button (click)="clear()">Clear Cart</button>
    </div>
  </div>
  `
})
export class CartComponent {
  cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  busy = false;
 
  private write(){ localStorage.setItem('cart', JSON.stringify(this.cart)); }
 
  inc(i:number){ this.cart[i].qty++; this.write(); }
  dec(i:number){ this.cart[i].qty = Math.max(1, this.cart[i].qty - 1); this.write(); }
  remove(i:number){ this.cart.splice(i,1); this.write(); }
  clear(){ this.cart = []; this.write(); }
  total(){ return this.cart.reduce((s,it)=> s + it.price * it.qty, 0); }
 
  constructor(private api: ApiService) {}
 
  async purchase(){
    if (!this.cart.length) { alert('Cart empty'); return; }
    this.busy = true;
    try {
      await Promise.all(
        this.cart.map(it => this.api.placeOrder(it.id, it.qty || 1).toPromise())
      );
      alert('Purchase successful');
      this.clear();
    } catch (err:any) {
      alert('Purchase failed: ' + (err?.error?.message || err?.message || 'Unknown error'));
    } finally {
      this.busy = false;
    }
  }
}
 