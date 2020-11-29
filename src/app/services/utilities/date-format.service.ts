import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor() { }


  formatDate(date){

    if (date == null) return;


    console.log(date.slice(0,date.indexOf('T')));

    return date.slice(0,date.indexOf('T'));

  }
}
