import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weightConverter',
  standalone: true
})
export class WeightConverterPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return parseFloat(value) * 1000 + ' g';
  }
}
