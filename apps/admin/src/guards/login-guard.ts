import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Common } from '../services/common';
import { UserModel } from '@/shared/models/user.model';

export const loginGuard: CanActivateFn = (route, state) => {
  
  const res = localStorage.getItem("response");
  const router = inject(Router)
  const common = inject(Common)
  if(!res){
    router.navigateByUrl('/login')
  }

  const userModel:UserModel=JSON.parse(res!);
  common.userModel.set(userModel);
  
  return true;
};
