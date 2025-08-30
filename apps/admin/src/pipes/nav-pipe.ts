import { Pipe, PipeTransform } from '@angular/core';
import { Navigation } from '../navigations';

@Pipe({
  name: 'nav'
})
export class NavPipe implements PipeTransform {

  transform(value: Navigation[], search: string):Navigation[] {
    return value.filter(p=> p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  }

}
