import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Product } from '../../services/api';
 
@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <h2>Seller Dashboard</h2>
 
    <form class="grid" (ngSubmit)="addProduct()">
      <input [(ngModel)]="form.name" name="name" placeholder="Product name" required />
      <input [(ngModel)]="form.price" name="price" type="number" placeholder="Price" required />
      <input [(ngModel)]="form.category" name="category" placeholder="Category (cloth/cosmetics/footwear/utensils/mobiles)" required />
      <input [(ngModel)]="form.type" name="type" placeholder="Type (optional, e.g. men/women)" />
 
      <div>
        <label>Image (optional):</label><br/>
        <input type="file" (change)="onFileSelected($event)" accept="image/*" />
        <div *ngIf="preview" style="margin-top:8px">
          <img [src]="preview" style="max-width:180px;max-height:120px;border-radius:8px"/>
        </div>
      </div>
 
      <button class="primary" type="submit">Add Product</button>
    </form>
 
    <h3 style="margin-top:20px">My Products</h3>
    <div class="list">
      <div class="item" *ngFor="let p of items">
        <img [src]="p.imageUrl || placeholder(p.name)" alt="" />
        <div class="name">{{p.name}}</div>
        <div class="meta">₹ {{p.price}} • {{p.category}} • {{p.type || 'na'}}</div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .card{padding:16px}
    form.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-items:center}
    form.grid button{grid-column:1/-1}
    .list{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-top:10px}
    .item{border:1px solid #e5e7eb;border-radius:10px;padding:10px;background:#0b1220;color:#f3f4f6}
    .item img{width:100%;height:140px;object-fit:cover;border-radius:8px;background:#111827}
    .name{font-weight:600;margin-top:6px}
    .meta{font-size:12px;opacity:.8}
  `]
})
export class SellerDashboardComponent implements OnInit {
  items: Product[] = [];
  selectedFile: File | null = null;
  preview: string | null = null;
 
  form = { name: '', price: 0, category: '', type: 'general' };
 
  constructor(public api: ApiService) {}
 
  ngOnInit() { this.loadMy(); }
 
  private toAbs(url?: string | null): string | null {
    if (!url) return null;
    return /^https?:\/\//i.test(url) ? url : `${this.api.host}${url.startsWith('/') ? '' : '/'}${url}`;
  }
 
  loadMy() {
    this.api.myProducts().subscribe(list => {
      this.items = (list || []).map(p => ({ ...p, imageUrl: this.toAbs(p.imageUrl) || undefined }));
    });
  }
 
  onFileSelected(ev: Event) {
    const f = (ev.target as HTMLInputElement).files?.[0] || null;
    this.selectedFile = f;
    if (!f) { this.preview = null; return; }
    const reader = new FileReader();
    reader.onload = () => this.preview = reader.result as string;
    reader.readAsDataURL(f);
  }
 
  addProduct() {
    if (!this.form.name || !this.form.price || !this.form.category) {
      alert('name, price and category are required'); return;
    }
    const fd = new FormData();
    fd.append('name', this.form.name);
    fd.append('price', String(this.form.price));
    fd.append('category', this.form.category);
    fd.append('type', this.form.type || 'general');
    if (this.selectedFile) fd.append('image', this.selectedFile); // key MUST be "image"
 
    this.api.addProductForm(fd).subscribe({
      next: (p) => {
        const normalized = { ...p, imageUrl: this.toAbs(p.imageUrl) || undefined };
        this.items.unshift(normalized as Product);
        this.form = { name: '', price: 0, category: '', type: 'general' };
        this.selectedFile = null;
        this.preview = null;
      },
      error: (err) => alert(err?.error || 'Upload failed')
    });
  }
 
  placeholder(name: string) {
    return `https://via.placeholder.com/400x300?text=${encodeURIComponent(name || 'Product')}`;
  }
}
 