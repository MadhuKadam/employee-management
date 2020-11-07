import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../employee/employee.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Employee[], args: any): unknown {
    if (!value) { return null; }
    if (!args) { return value; }

    args = args.toLowerCase();

    return value.filter(item => {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }

}
