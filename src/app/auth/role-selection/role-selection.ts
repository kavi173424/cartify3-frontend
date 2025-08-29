import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-role-selection',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="card">
    <h2>Who are you?</h2>
    <div class="grid3">
      <div class="card"><h3>Admin</h3><button class="primary" (click)="goto('/admin')">Continue</button></div>
      <div class="card"><h3>Seller</h3><button class="primary" (click)="goto('/seller')">Continue</button></div>
      <div class="card"><h3>User</h3><button class="primary" (click)="goto('/user')">Continue</button></div>
    </div>
  </div>`
})
export class RoleSelectionComponent {
  constructor(private router: Router) {}
  goto(path: string){ this.router.navigateByUrl(path); }
}
 