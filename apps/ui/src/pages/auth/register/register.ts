import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { initilaizeUser, UserModel } from '@/shared/models/user.model';
@Component({
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Register {
  readonly dataUser = signal<UserModel>(initilaizeUser);
  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  readonly #router = inject(Router);

  signUp(form: NgForm) {

    if(!form.valid) return;

    this.dataUser.update((prev) => ({
      ...prev,
      fullName: `${form.value['firstName']} ${form.value['lastName']}`,
    }));

    this.#http.post(`api/users`, this.dataUser()).subscribe(() => {
      this.#toast.showToast('Başarılı', 'Kullanıcı kaydı başarıyla tamamlandı');
      this.#router.navigateByUrl('/auth/login');
    });
  }
}
