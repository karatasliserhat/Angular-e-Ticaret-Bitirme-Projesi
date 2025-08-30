import { AfterViewChecked, ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { Common } from '../services/common';
import { breadCrumbModel } from '../pages/layouts/breadcrumb';

@Component({
  selector:"app-blank",
  imports: [],
  template: `
  <title>e-Ticaret | {{pageTitle()}} </title>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Blank implements AfterViewChecked {
 
  readonly pageTitle = input.required<string>();
  readonly breadCrumps = input.required<breadCrumbModel[]>();

  readonly #common = inject(Common);
   ngAfterViewChecked(): void {
    this.#common.set(this.breadCrumps());
  }
}
