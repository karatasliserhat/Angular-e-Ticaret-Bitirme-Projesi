import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { Common } from '../../services/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { BasketModel } from '@/shared/models/baskets.model';
import { TrCurrencyPipe } from 'tr-currency';
import { FlexiToastService } from 'flexi-toast';
import { RouterLink } from '@angular/router';

@Component({
  imports: [TrCurrencyPipe, RouterLink],
  templateUrl: './baskets.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Baskets {
  readonly #common = inject(Common);
  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  readonly result = httpResource<BasketModel[]>(
    () => `api/baskets?userId=${this.#common.user()?.id}`
  );

  readonly data = computed(() => this.result.value() ?? []);

  constructor() {
    this.#common.getBasketCount();
  }

  readonly total = computed(() => {
    let val = 0;

    this.data().forEach((res) => {
      val += res.price * res.quantity;
    });
    return val;
  });
  readonly kdv = computed(() => (this.total() * 18) / 100);

  increment(val: BasketModel) {
    val.quantity++;
    this.#http.put(`api/baskets/${val.id}`, val).subscribe(() => {
      this.result.reload();
      this.#common.getBasketCount();
    });
  }

  decrement(val: BasketModel) {
    const quantity = val.quantity - 1;
    if (quantity <= 0) {
      this.#toast.showSwal(
        'Sil',
        'Ürünü Sepetinizden kaldırmak istedğinize Emin misiniz?',
        'Sil',
        () => {
          this.#http.delete(`api/baskets/${val.id}`).subscribe(() => {
            this.result.reload();
            this.#common.getBasketCount();
          });
        }
      );
    } else {
      val.quantity--;
      this.#http.put(`api/baskets/${val.id}`, val).subscribe(() => {
        this.result.reload();
        this.#common.getBasketCount();
      });
    }
  }
}
