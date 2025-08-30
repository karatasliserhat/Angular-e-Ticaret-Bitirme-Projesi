import { BasketModel } from '@/shared/models/baskets.model';
import { UserModel } from '@/shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Common {
  readonly user = signal<UserModel | undefined>(undefined);

  readonly #http = inject(HttpClient);
  readonly basketCount = signal<number>(0);
  
  constructor() {
    this.getBasketCount();
    const response: string | null = localStorage.getItem("response");
    if (response) {
      this.user.set(JSON.parse(response));
    }
  }

  getBasketCount() {
    if(this.user()){
 this.#http
      .get<BasketModel[]>(`api/baskets?userId=${this.user()?.id}`)
      .subscribe((res) => {
        this.basketCount.set(res.length);
      });
    }
   
  }
}
