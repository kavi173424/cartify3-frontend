import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <h2>Seller Dashboard</h2>
    <form class="grid2" (ngSubmit)="add()">
      <input [(ngModel)]="form.name" name="name" placeholder="Product name" required />
      <input [(ngModel)]="form.price" name="price" placeholder="Price" type="number" required />
      <input [(ngModel)]="form.category" name="category" placeholder="Category (cloth/cosmetics/footwear/utensils/mobiles)" required />
      <input [(ngModel)]="form.type" name="type" placeholder="Type (men/women/western/traditional/pant/shirt)" required />
      <input [(ngModel)]="form.imageUrl" name="imageUrl" placeholder="Image URL (optional)" />
      <button class="primary">Add Product</button>
    </form>
    <h3>My Products</h3>
    <div class="list">
      <div class="item" *ngFor="let p of items">
        <img [src]="p.imageUrl || 'https://via.placeholder.com/400x300?text='+p.name" />
        <b>{{p.name}}</b>
        <div class="badge">₹ {{p.price}}</div>
        <div class="badge">{{p.category}}</div>
        <div class="badge">{{p.type}}</div>
      </div>
    </div>
  </div>`
})
export class SellerDashboardComponent {
  form:any = { name:'', price:0, category:'', type:'', imageUrl:'' };
  items:any[]=[];
  constructor(private api: ApiService){ this.load(); }
  load(){ this.api.myProducts().subscribe(r=> this.items = r); }
  add(){
    const body = { name:this.form.name, price:+this.form.price, category:this.form.category, type:this.form.type, imageUrl:this.form.imageUrl };
    this.api.addProduct(body).subscribe(()=>{ this.form={ name:'', price:0, category:'', type:'', imageUrl:'' }; this.load(); });
  }
}
 