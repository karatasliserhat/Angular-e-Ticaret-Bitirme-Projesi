import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank';
import { breadCrumbModel } from '../layouts/breadcrumb';
import { FlexiGridModule } from 'flexi-grid';
import { HttpClient, httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { FormsModule } from '@angular/forms';
import {UserModel} from '@/shared/models/user.model'

@Component({
  imports: [Blank, FlexiGridModule, RouterLink, FormsModule],
  templateUrl: './users.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Users {

  readonly breadCrumps = signal<breadCrumbModel[]>([{
    title: "Kullanıcılar",
    icon: "groups_2",
    url: "users"
  }])


  readonly results = httpResource<UserModel[]>(() => "api/users");

  readonly data = computed(() => this.results.value() || []);

  readonly loading = computed(() => this.results.isLoading());

  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService)

  delete(id: string) {
    this.#toast.showSwal("Sil", "Kullanıcıyı Silmek istiyor musunuz?", "Evet", () => {

      this.#http.delete(`api/users/${id}`).subscribe(() => {
        this.#toast.showToast("Başarılı", "Silme işlemi başarıyla tamamlanmıştır", "success");
        this.results.reload();
      })
    }, "Hayır", () => {
      this.#toast.showToast("Sil", "Kullanıcı silme işleminden vazgeçildi", "info");
    })
  }
  changeIsAdmin(data: UserModel) {
    this.#http.put(`api/users/${data.id}`, data).subscribe(() => {
      this.results.reload();
    })
  }
}
