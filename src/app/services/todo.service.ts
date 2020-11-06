import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient : HttpClient) { }




  /// ADD TODO 
  addTodo(todo){

    return this.httpClient.post("http://18.130.183.191:4500/todos", todo);

  }



  /// READ ALL 


  /// rest parameters
  /*getTodos(...params){

    console.log(params);
    console.log(params.length);

    /*const httpParams = new HttpParams()
    .append("input",inputTerm)
    .append("field",fieldTerm)
    .append("order",orderTerm)
    .append("done",doneTerm)

    return this.httpClient.get("http://18.130.183.191:4500/todos");

  }*/


  /// hard inserted parameters
    getTodos(inputTerm?,fieldTerm?,orderTerm?,doneTerm?) {

      if ((inputTerm == undefined || inputTerm == null) && 
          (fieldTerm == undefined || fieldTerm == null) &&
          (orderTerm == undefined || orderTerm == null) &&
          (doneTerm == undefined || doneTerm == null) 
        )
      return this.httpClient.get("http://18.130.183.191:4500/todos");


      /// operatore ternario qua
      inputTerm != undefined ? inputTerm : inputTerm = '';
      fieldTerm != undefined ? fieldTerm : fieldTerm = ''; 
      orderTerm != undefined ? orderTerm : orderTerm = ''; 
      doneTerm != undefined ? doneTerm : doneTerm = ''; 


      const httpParams = new HttpParams()
            .append("input",inputTerm)
            .append("field",fieldTerm)
            .append("order",orderTerm)
            .append("done",doneTerm)


      return this.httpClient.get("http://18.130.183.191:4500/todos", { params : httpParams });


    }



  /// GET TODO BY ID 

  getTodoById(id){

    return this.httpClient.get("http://18.130.183.191:4500/todos/" + id);

  }




  /// UPDATE TODO
  editTodo(id, updatedTodo){

    return this.httpClient.put("http://18.130.183.191:4500/todos/" + id, updatedTodo);

  }



  /// SET DONE 
  setDone(id,done){

    console.log(id);
    console.log(done);

    return this.httpClient.patch("http://18.130.183.191:4500/todos/done/" + id, { done : done });

  }



  /// DELETE TODO
  deleteTodo(id){

    return this.httpClient.delete("http://18.130.183.191:4500/todos/" + id);

  }



  /// DELETE MULTIPLE TODOS
  deleteMultipleTodos(todos : any[]){

    console.log(todos);

    return this.httpClient.request("DELETE","http://18.130.183.191:4500/todos/", { body : { ids : todos} });

  }

}
