import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <h2>Seller</h2>
    <div class="grid2">
      <form (ngSubmit)="register()">
        <h3>Register</h3>
        <input [(ngModel)]="reg.name" name="name" placeholder="Store Name" required />
        <input [(ngModel)]="reg.email" name="email" placeholder="Email" required />
        <input [(ngModel)]="reg.password" name="password" placeholder="Password" type="password" required />
        <button class="primary">Register</button>
      </form>
      <form (ngSubmit)="login()">
        <h3>Login</h3>
        <input [(ngModel)]="log.email" name="lemail" placeholder="Email" required />
        <input [(ngModel)]="log.password" name="lpassword" placeholder="Password" type="password" required />
        <button class="secondary">Login</button>
      </form>
    </div>
  </div>`
})
export class SellerAuthComponent {
  reg = { name:'', email:'', password:'' };
  log = { email:'', password:'' };
  constructor(private auth: AuthService, private router: Router){}
  register(){ this.auth.register({...this.reg, role:'Seller'}).subscribe(r=>{ this.auth.saveAuth(r.token, r.role); this.router.navigateByUrl('/seller/dashboard'); }); }
  login(){ this.auth.login(this.log).subscribe(r=>{ this.auth.saveAuth(r.token, r.role); this.router.navigateByUrl('/seller/dashboard'); }); }
}
 