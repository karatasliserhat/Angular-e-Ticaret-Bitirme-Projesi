import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Common } from '../../services/common';
import { httpResource } from '@angular/common/http';
import { OrderModel } from '@/shared/models/order.model';
import { DatePipe } from '@angular/common';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
  imports: [DatePipe,TrCurrencyPipe],
  templateUrl: './orders.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Orders {
  readonly #common = inject(Common);
  readonly limit = signal<number>(4);
  readonly totalCount = signal<number>(16);
  readonly pendingCount = signal<number>(7);
  readonly completedCount = signal<number>(5);

  readonly resultOrders = httpResource<OrderModel[]>(
    () => `api/orders?userid=${this.#common.user()?.id}&_limit=${this.limit()}`
  );

  readonly orders = computed(() => this.resultOrders.value() ?? []);

  showMore() {
    this.limit.update((prev) => prev + 4);
  }

  readonly totalPrice = computed(()=>{
    let total = 0;
    this.orders().forEach(x=> {
      x.baskets.forEach(y=> total+= (y.price*y.quantity)*1.18);

    })
          return total;
  })
}
