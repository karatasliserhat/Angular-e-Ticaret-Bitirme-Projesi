import { httpResource } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { categoryModel } from '@/shared/models/category.model';
import { Common } from '../../services/common';
@Component({
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layouts.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Layouts implements AfterViewInit {
  readonly #result = httpResource<categoryModel[]>(() => `api/categories`);
  readonly dataCategory = computed(() => this.#result.value() ?? []);
  readonly user = computed(() => this.#common.user());
  readonly #router = inject(Router);
  readonly #common = inject(Common);
  readonly basketCount = computed(() => this.#common.basketCount());
  logout() {
    localStorage.clear();
    this.#common.user.update(() => undefined);
    this.#router.navigateByUrl('/auth/login');
    this.#common.basketCount.set(0);
  }

  ngAfterViewInit(): void {
    this.#common.getBasketCount();
  }
}
