import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import Breadcrumb from './breadcrumb';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { navigations } from '../../navigations';
import { NavPipe } from '../../pipes/nav-pipe';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Common } from '../../services/common';

@Component({
  imports: [
    Breadcrumb, 
    RouterLink,
    NavPipe,
    RouterLinkActive,
    FormsModule,
    DatePipe,
    RouterOutlet
  ],
  templateUrl: './layouts.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Layouts {

readonly time = signal<Date | string>("");  
readonly search = signal<string>("");
readonly #router = inject(Router);
readonly #common = inject(Common)

readonly navigations = computed(()=> navigations);

readonly userModel = computed(()=> this.#common.userModel());

constructor(){
  setInterval(()=>{
    this.time.set(new Date())
  },1000)
}

logout(){
  localStorage.clear();
  this.#router.navigateByUrl('/login');
}
}
