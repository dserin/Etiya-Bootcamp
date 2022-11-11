import { Pipe, PipeTransform } from '@angular/core';
import { Service } from '../models/service';

@Pipe({
  name: 'filterService',
})
export class FilterServicePipe implements PipeTransform {
  transform(value: Service[], name: string): Service[] {
    return value.filter((service) =>
      service.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );
  }
}
