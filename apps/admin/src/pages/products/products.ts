/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank';
import { breadCrumbModel } from '../layouts/breadcrumb';
import { FlexiGridFilterDataModel, FlexiGridModule } from 'flexi-grid';
import { HttpClient, httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import {categoryModel} from '@/shared/models/category.model'
import {productModel} from '@/shared/models/product.model'

@Component({
  imports: [
    Blank,
    FlexiGridModule,
    RouterLink
  ],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Product {
  readonly breadCrumps = signal<breadCrumbModel[]>([{

    title: "Ürünler", icon: "featured_seasonal_and_gifts", url: "products"
  }]);


  readonly result = httpResource<productModel[]>(() => "api/products");
  readonly data = computed(() => this.result.value() ?? []);
  readonly loading = computed(() =>this.result.error()? false : this.result.isLoading());


  readonly categoryData = httpResource<categoryModel[]>(() => 'api/categories');

  readonly categoryFilter = computed<FlexiGridFilterDataModel[]>(() => {
    const categories = this.categoryData.value() ?? [];
    return categories.map<FlexiGridFilterDataModel>(
      (val)=>
      ({name:val.name,value:val.name}));
  });


  readonly #toast = inject(FlexiToastService);
  readonly #http = inject(HttpClient);

  delete(id: string) {
    this.#toast.showSwal("Ürün Sil?", "Ürünü silmek istiyor musunuz?", "Sil", () => {
      this.#http.delete(`api/products/${id}`).subscribe(() => {
        this.result.reload();
        this.#toast.showToast("Sil", "Ürün başarıyla silindi", "success");
      });
    }, "Vazgeç", () => {
      this.#toast.showToast("Vazgeç", "Ürün silmekten vazgeçildi", "info");
    });
  }
}
