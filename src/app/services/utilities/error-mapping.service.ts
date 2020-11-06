import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMappingService {

  constructor() { }


  mapError(error){

    if (error.includes("E11000 duplicate key error collection:")) return 'Title already exists!' ;
    

  }
}
