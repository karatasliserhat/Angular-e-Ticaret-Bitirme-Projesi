/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component, computed, inject, resource, signal, ViewEncapsulation } from '@angular/core';
import { breadCrumbModel } from '../../layouts/breadcrumb';
import { categoryModel, initilaizeCategori } from '@/shared/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FlexiToastService } from 'flexi-toast';
import { lastValueFrom } from 'rxjs';
import Blank from 'apps/admin/src/components/blank';

@Component({
  imports: [Blank, FormsModule],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Create {
  readonly breadCrumps = signal<breadCrumbModel[]>([
    {
      title: "Kategoriler", icon: "category", url: "categories"
    }
  ]);

  readonly id = signal<string | undefined>(undefined);
  readonly title = computed(() => this.id() ? 'Kategori Güncelle' : 'Kategori Ekle');
  readonly btnName = computed(() => this.id() ? 'Güncelle' : 'Kaydet');


  readonly result = resource({
    params: () => this.id(),
    loader: async () => {

      const res = await lastValueFrom(this.#http.get<categoryModel>(`api/categories/${this.id()}`)

      );

      this.breadCrumps.update(
        prev => [...prev,
        { title: res.name, icon: "edit", url: `categories/edit/${this.id()}` }])
      return res;
    }
  });

  readonly data = computed<categoryModel>(() => this.result.value() ?? { ...initilaizeCategori });

  readonly #activatedId = inject(ActivatedRoute);

  constructor() {
    this.#activatedId.params.subscribe(res => {
      if (res['id']){
                this.id.set(res['id']);

      }else{
        this.breadCrumps.update(
          prev => [...prev,
          { title: "Kategori Ekle", icon: "add", url: "categories/create" }])
      }
    });
  }

  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService)
  readonly #router = inject(Router);
  save(form: NgForm) {
    if (!form.valid) return;
    if (!this.id()) {
      this.#http.post("api/categories", form.value).subscribe(() => {
        this.#toast.showToast("Başarılı Ekleme", "Kategori başarıyla eklendi", "success");
        this.#router.navigateByUrl("/categories");
      })
    }
    else {
      this.#http.put(`api/categories/${this.id()}`, form.value).subscribe(() => {
        this.#toast.showToast("Başarılı Güncelleme", "Kategori başarıyla güncellendi", "success");
        this.#router.navigateByUrl("/categories");

      })
    }
  }
}
