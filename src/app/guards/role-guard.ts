import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const roles = route.data?.['roles'] as string[] | undefined;
  const currentRole = auth.role();
 
  if (!roles || !currentRole) { router.navigateByUrl('/'); return false; }
  if (roles.includes(currentRole)) return true;
 
  router.navigateByUrl('/'); return false;
};
 