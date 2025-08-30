/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HttpClient, httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Common } from '../../services/common';
import { BasketModel } from '@/shared/models/baskets.model';
import { TrCurrencyPipe } from 'tr-currency';
import { NgxMaskDirective } from 'ngx-mask';
import { FormsModule, NgForm } from '@angular/forms';
import { initializeOrder, OrderModel } from '@/shared/models/order.model';
import { FlexiToastService } from 'flexi-toast';
import { DatePipe } from '@angular/common';
import { FlexiSelectModule } from 'flexi-select';
@Component({
  imports: [RouterLink, TrCurrencyPipe, FormsModule, NgxMaskDirective, DatePipe, FlexiSelectModule],
  templateUrl: './payment.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Payment {
  readonly #common = inject(Common);
  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  baskets = httpResource<BasketModel[]>(
    () => `api/baskets?userId=${this.#common.user()?.id}`
  );

  readonly basketData = computed(() => this.baskets.value() ?? []);

  readonly total = computed(() => {
    let val = 0;
    this.basketData().forEach((res) => {
      val += res.price;
    });
    return val;
  });

  readonly kdv = computed(() => (this.total() * 18) / 100);
  readonly data = signal<OrderModel>({...initializeOrder});
  readonly showOrderSuccessPage = signal<boolean>(false);
  
  readonly cityResult = httpResource<any[]>(()=> '/il-ilce.json');
  readonly cityData = computed(()=> this.cityResult.value() ?? []);
  
  readonly district = signal<any[]>([]);
  pay(form: NgForm) {
    if (!form.valid) return;

    if(this.data().term===false){
      console.log(this.data().term)
      this.#toast.showToast("Uyarı","Lütfen Kullanım koşullarını onaylayın","warning")
      return;
    }

    this.data.update((prev) => ({
      ...prev,
      userId: this.#common.user()!.id!,
      orderNumber: `TS-${new Date().getFullYear()}-${new Date().getTime()}`,
      date:new Date(),
      baskets: [...this.basketData()]
      
    }));
    this.#http.post(`api/orders`, this.data()).subscribe(() => {
      this.data().baskets.forEach(res=>{
        this.#http.delete(`api/baskets/${res.id}`).subscribe(()=>{
              this.showOrderSuccessPage.set(true);
              this.#common.basketCount.set(0);
        });
      })
      this.#toast.showToast('Başarılı', 'Ödeme işlemi başarılı Sipariş Alındı');
    });
  }
  setDistrict(){
    const city = this.cityData().find(x=> x.il_adi===this.data().city);
    this.district.set(city.ilceler)
  }
}
