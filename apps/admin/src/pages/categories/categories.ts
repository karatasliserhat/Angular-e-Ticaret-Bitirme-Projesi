/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank';
import { breadCrumbModel } from '../layouts/breadcrumb';
import { FlexiToastService } from 'flexi-toast';
import { HttpClient, httpResource } from '@angular/common/http';
import { FlexiGridModule } from 'flexi-grid';
import { RouterLink } from '@angular/router';
import {categoryModel} from '@/shared/models/category.model'

@Component({
  imports: [Blank,FlexiGridModule, RouterLink],
  templateUrl: './categories.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Categories {
  readonly breadCrumps = signal<breadCrumbModel[]>([{
    title: "Kategori",
    icon: "category",
    url: "categories"
  }]);

  readonly result = httpResource<categoryModel[]>(() => "api/categories");
  readonly data = computed(() => this.result.value() ?? [])
  readonly loading = computed(()=> this.result.isLoading());

  readonly #flexiToastService = inject(FlexiToastService);
  readonly #http = inject(HttpClient);
  delete(id:string){
    this.#flexiToastService.showSwal("Kategori Sil","Kategori silmek istiyor musunuz?","Sil",()=>{
      this.#http.delete(`api/categories/${id}`).subscribe(()=>{
        this.#flexiToastService.showToast("Sil","Kategori Başarıyla Silindi");
      });
    },"iptal",()=>{
      this.#flexiToastService.showToast("Sil","Kategori silmekten vazgeçildi.");
    });
  }


}
