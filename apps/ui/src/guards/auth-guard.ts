import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  const response = localStorage.getItem('response');

  const router = inject(Router);
  if(!response){
    router.navigateByUrl('/');
    return false;
  }
  
  return true;
};
