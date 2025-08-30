/* eslint-disable no-debugger */
import { BasketModel } from '@/shared/models/baskets.model';
import { httpResource } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Common } from '../services/common';

export const paymentGuard: CanActivateFn = (route, state) => {
 const common = inject(Common);

  const basketCount = computed(()=> common.basketCount());
  const router = inject(Router);
  if (basketCount()===0) {
    router.navigateByUrl('baskets');
    return false;
  }

  return true;
};
