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
      <input [(ngModel)]="form.type" name="type" placeholder="Type (e.g. general/men/women)" />
      <div>
        <label>Image (optional): </label>
        <input type="file" accept="image/*" (change)="onFileSelected($event)" />
        <div *ngIf="preview" style="margin-top:8px">
          <img [src]="preview" style="width:180px;height:120px;object-fit:cover;border-radius:8px;border:1px solid #374151"/>
        </div>
      </div>
      <button class="primary">Add Product</button>
    </form>
 
    <h3>My Products</h3>
    <div class="list">
      <div class="item" *ngFor="let p of items">
        <img [src]="p.__localImage || 'https://via.placeholder.com/400x300?text='+p.name" />
        <b>{{p.name}}</b>
        <div class="badge">₹ {{p.price}}</div>
        <div class="badge">{{p.category}}</div>
        <div class="badge">{{p.type || 'general'}}</div>
      </div>
    </div>
  </div>`
})
export class SellerDashboardComponent {
  form:any = { name:'', price:0, category:'', type:'general' };
  items:any[]=[];
  preview: string | null = null; // base64 preview
 
  constructor(private api: ApiService){ this.load(); }
 
  load(){ this.api.myProducts().subscribe(r=> this.items = r); }
 
  onFileSelected(evt: Event){
    const file = (evt.target as HTMLInputElement).files?.[0];
    if(!file) { this.preview = null; return; }
    const reader = new FileReader();
    reader.onload = () => this.preview = reader.result as string;
    reader.readAsDataURL(file);
  }
 
  add(){
    const body = {
      name: this.form.name,
      price: +this.form.price,
      category: this.form.category,
      type: this.form.type || 'general'
    };
 
    this.api.addProduct(body).subscribe(()=>{
      // add preview locally for UX
      this.items.unshift({ ...body, __localImage: this.preview });
      this.form = { name:'', price:0, category:'', type:'general' };
      this.preview = null;
    });
  }
}
 