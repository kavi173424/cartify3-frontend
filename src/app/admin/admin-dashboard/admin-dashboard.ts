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
 
    <h3 style="margin-top:12px">Users</h3>
    <div style="overflow:auto">
      <table style="width:100%; border-collapse:collapse">
        <thead>
          <tr>
            <th style="text-align:left;border-bottom:1px solid #374151;padding:8px">Id</th>
            <th style="text-align:left;border-bottom:1px solid #374151;padding:8px">Name</th>
            <th style="text-align:left;border-bottom:1px solid #374151;padding:8px">Email</th>
            <th style="text-align:left;border-bottom:1px solid #374151;padding:8px">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let u of users">
            <td style="padding:8px">{{u.id}}</td>
            <td style="padding:8px">{{u.name}}</td>
            <td style="padding:8px">{{u.email}}</td>
            <td style="padding:8px">{{u.role}}</td>
          </tr>
        </tbody>
      </table>
    </div>
 
    <h3 style="margin-top:16px">Sellers</h3>
    <div style="overflow:auto">
      <table style="width:100%; border-collapse:collapse">
        <thead>
          <tr>
            <th style="text-align:left;border-bottom:1px solid #374151;padding:8px">Id</th>
            <th style="text-align:left;border-bottom:1px solid #374151;padding:8px">Name</th>
            <th style="text-align:left;border-bottom:1px solid #374151;padding:8px">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let s of sellers">
            <td style="padding:8px">{{s.id}}</td>
            <td style="padding:8px">{{s.name}}</td>
            <td style="padding:8px">{{s.email}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>`
})
export class AdminDashboardComponent {
  users:any[]=[]; sellers:any[]=[];
  constructor(private api: ApiService){ this.load(); }
  load(){ this.api.getUsers().subscribe(u=>this.users=u); this.api.getSellers().subscribe(s=>this.sellers=s); }
}
 