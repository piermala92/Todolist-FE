import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(date): unknown {

    if (date == null) return;

    return formatDate(date,'dd-MM-yyyy HH:mm:ss','en-US')

  }

}
