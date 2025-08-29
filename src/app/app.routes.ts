import { Routes } from '@angular/router';
import { RoleSelectionComponent } from './auth/role-selection/role-selection';
import { AdminAuthComponent } from './auth/admin-auth/admin-auth';
import { SellerAuthComponent } from './auth/seller-auth/seller-auth';
import { UserAuthComponent } from './auth/user-auth/user-auth';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard';
import { ProductListComponent } from './user/product-list/product-list';
import { CartComponent } from './user/cart/cart';
// import { roleGuard } from './guards/role.guard';

import { roleGuard } from './guards/role-guard';
export const routes: Routes = [
  { path: '', component: RoleSelectionComponent },
 
  { path: 'admin', component: AdminAuthComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [roleGuard], data: { roles: ['Admin'] } },
 
  { path: 'seller', component: SellerAuthComponent },
  { path: 'seller/dashboard', component: SellerDashboardComponent, canActivate: [roleGuard], data: { roles: ['Seller'] } },
 
  { path: 'user', component: UserAuthComponent },
  { path: 'shop', component: ProductListComponent },
 
  { path: 'cart', component: CartComponent, canActivate: [roleGuard], data: { roles: ['User','Admin'] } },
 
  { path: '**', redirectTo: '' }
];
 