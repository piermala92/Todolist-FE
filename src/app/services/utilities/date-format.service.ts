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

		/*let d = date.getDate();
		let m = date.getMonth() + 1;
		let y = date.getFullYear();

		let dateString = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) ;

    console.log(dateString);*/

  }
}
