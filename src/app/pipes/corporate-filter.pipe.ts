import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corporateFilter'
})
export class CorporateFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
