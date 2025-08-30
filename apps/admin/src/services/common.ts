import { Injectable, signal } from '@angular/core';
import { breadCrumbModel } from '../pages/layouts/breadcrumb';
import { UserModel } from '@/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class Common {
  readonly data = signal<breadCrumbModel[]>([])


  readonly userModel = signal<UserModel | undefined>(undefined);

  
  set(data: breadCrumbModel[]) {

    const val: breadCrumbModel = {
      title: "Ana Sayfa",
      icon: "home",
      url: "/"
    };
    this.data.set([val, ...data]);
  };

  readonly response: string | null = localStorage.getItem('response');

  constructor(){
    if(this.response){
      this.userModel.set(JSON.parse(this.response))
    }
  }
}
