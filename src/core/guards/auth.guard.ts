import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/loginService/login.service';

export const authGuard = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isAuthenticated()) {
    return true;
  }

  // Redirigir al login si no está autenticado
  router.navigate(['/login']);
  return false;
}; 