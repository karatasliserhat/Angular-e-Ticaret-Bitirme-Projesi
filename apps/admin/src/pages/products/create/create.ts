/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable no-var */
import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, resource, signal, ViewEncapsulation } from '@angular/core';
import Blank from 'apps/admin/src/components/blank';
import { breadCrumbModel } from '../../layouts/breadcrumb';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, httpResource } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { NgxMaskDirective } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';
import { initalizeProduct, productModel } from '@/shared/models/product.model';
import { categoryModel } from '@/shared/models/category.model';
import { FlexiSelectModule } from 'flexi-select';
@Component({
  imports: [Blank, FormsModule, NgxMaskDirective, FlexiSelectModule],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Create {
  readonly breadCrumps = signal<breadCrumbModel[]>(
    [
      {
        title: "Ürünler", icon: "featured_seasonal_and_gifts", url: "products"
      }
    ]);
  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);
  // readonly #location = inject(Location);

  readonly id = signal<string | undefined>(undefined);
  readonly #activeRouter = inject(ActivatedRoute);

  constructor() {
    this.#activeRouter.params.subscribe(res => {
      if (res["id"]) {
        this.id.set(res["id"]);
      } else {
        this.breadCrumps.update(
          prev => [...prev,
          { title: "Ürün Ekle", icon: "add", url: "products/create" }])
      }

    })
  }


  readonly categoryResult = httpResource<categoryModel[]>(() => "api/categories");
  readonly categoryData = computed(() => this.categoryResult.value() ?? []);
  readonly categoryLoading = computed(() => this.result.isLoading());

  readonly title = computed(() => this.id() ? 'Ürün Güncelle' : 'Ürün Ekle');
  readonly btnName = computed(() => this.id() ? 'Güncelle' : 'Kaydet');

  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      const res = await lastValueFrom(this.#http.get<productModel>(`api/products/${this.id()}`)
    
    );
     this.breadCrumps.update(
          prev => [...prev,
          { title: res.name, icon: "edit", url: `products/edit/${this.id()}` }])
      return res;
    }
  }
);

  readonly data = linkedSignal(() => this.result.value() ?? { ...initalizeProduct })
  save(form: NgForm) {

    if (!form.valid) return;
    if (!this.id()) {
      this.data().id = this.data().name + this.data().categoryName + this.data().stock
      this.#http.post("api/products", this.data()).subscribe(() => {
        this.#router.navigateByUrl("/products");
        // this.#location.back();
        this.#toast.showToast("Ürün Ekleme", "Ürün ekleme işlemi başarılı", "success");
      })
    } else {
      this.#http.put(`api/products/${this.id()}`, this.data()).subscribe(() => {
        this.#router.navigateByUrl("/products");
        // this.#location.back();
        this.#toast.showToast("Ürün Güncelleme", "Ürün başarıyla güncellendi.", "info");
      })
    }


  }

  setCategoryName() {
    const id = this.data().categoryId;
    var category = this.categoryData().find(p => p.id == id);
    this.data.update((prev) => ({ ...prev, categoryName: category?.name ?? "", categoryUrl:category?.url ?? "" }))


  }
}
