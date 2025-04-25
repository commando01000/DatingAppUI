import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  if (_authService.currentUser() != null) return true;

  toastr.error('You are not logged in');
  router.navigate(['/home']);
  return false;
};
