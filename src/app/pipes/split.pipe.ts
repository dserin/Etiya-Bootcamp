import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split',
})
export class SplitPipe implements PipeTransform {
  // uyguladığım metinde operatöre göre split yap geriye array olarak elemanları dön
  // "halit,anıl,burak,burak,büşranur,doğacan"
  // ["halit","anıl","burak","burak","büşranur"]
  transform(value: string, operator: string): string[] {
    return value.split(operator);
  }
}
