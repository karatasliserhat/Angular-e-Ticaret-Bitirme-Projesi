/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, resource, signal, ViewEncapsulation } from '@angular/core';
import Blank from 'apps/admin/src/components/blank';
import { breadCrumbModel } from '../../layouts/breadcrumb';
import { FormsModule, NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { initilaizeUser, UserModel } from '@/shared/models/user.model';
import { FlexiToastService } from 'flexi-toast';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [Blank, FormsModule],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Create {
  readonly breadCrumps = signal<breadCrumbModel[]>([{
    title: "Kullanıcılar",
    icon: "groups_2",
    url: "users"
  }
  ]);
  readonly id = signal<string | undefined>(undefined);

  readonly #activatedRoute = inject(ActivatedRoute);

 constructor() {
    this.#activatedRoute.params.subscribe(res => {
      if (res['id']) {
        this.id.set(res['id']);
      }else {
        this.breadCrumps.update(
          prev => [...prev,
          { title: "Kullanıcı Ekle", icon: "add", url: "users/create" }])
      }
    });
  }

  readonly #router = inject(Router);
  readonly title = computed(() => this.id() ? 'Kullanıcı Güncelle' : 'Kullanıcı Ekle')
  readonly btnName = computed(() => this.id() ? 'Güncelle' : 'Ekle');
  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  
  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      const res = await lastValueFrom(this.#http.get<UserModel>(`api/users/${this.id()}`)
    );
    this.breadCrumps.update(
        prev => [...prev,
        { title: res.fullName!, icon: "edit", url: `users/edit/${this.id()}` }])
      return res;
    }
  })
  readonly data = linkedSignal(() => this.result.value() || { ...initilaizeUser});

 
  save(form: NgForm) {
    if (!form.valid) return;

    if (!this.id()) {

      this.data.update((prev)=> 
        ({...prev,fullName:`${prev.firstName} ${prev.lastName}` }));
      
      this.#http.post("api/users", this.data()).subscribe(() => {
        this.#toast.showToast("Başarılı", "Kullanıcı ekleme işlemi başarılı", "success");
        this.#router.navigateByUrl("users");
      });
    } else {
      this.#http.put(`api/users/${this.id()}`, this.data()).subscribe(() => {
        this.#toast.showToast("Başarılı", "Kullanıcı güncelleme işlemi başarılı", "info");
        this.#router.navigateByUrl("users");
      });
    }

  }
}
