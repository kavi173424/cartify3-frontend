import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
 
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="card">
    <h2>Admin Dashboard</h2>
    <button (click)="load()">Refresh</button>
    <h3>Users</h3>
    <pre>{{users | json}}</pre>
    <h3>Sellers</h3>
    <pre>{{sellers | json}}</pre>
  </div>`
})
export class AdminDashboardComponent {
  users:any[]=[]; sellers:any[]=[];
  constructor(private api: ApiService){ this.load(); }
  load(){ this.api.getUsers().subscribe(u=>this.users=u); this.api.getSellers().subscribe(s=>this.sellers=s); }
}
 