import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserModel } from '@/shared/models/user.model';
import { Router } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { Common } from '../../services/common';

@Component({
  imports: [FormsModule],
  templateUrl: './login.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Login {

readonly #http = inject(HttpClient)
readonly #router = inject(Router)
readonly #toast = inject(FlexiToastService)
readonly #common = inject(Common);
signIn(form:NgForm){

 const endpoint = `api/users?userName=${form.value['userName']}&password=${form.value['password']}`
 
 this.#http.get<UserModel[]>(endpoint).subscribe(res=>{
  if(!form.valid) return;
  if(res.length === 0) {
    this.#toast.showToast("Hata","Kullanıcı Adı veya Şifrenizi hatalı girdiniz","error");
    return;
  }
  else if(!res[0].isAdmin){
    this.#toast.showToast("Hata","Sayfaya erişim izniniz yok...","error");
    return;
  }

  localStorage.setItem("response",JSON.stringify(res[0]));
  this.#common.userModel.set(res[0]);
  this.#router.navigateByUrl('/');
 });
 
}

}
