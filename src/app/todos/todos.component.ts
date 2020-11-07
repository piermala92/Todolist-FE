import { FormatDatePipe } from './../custom-pipes/format-date.pipe';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { debounceTime, map } from 'rxjs/operators';



interface Todo {

  title : string;
  description : string;
  done : boolean;
  created : Date;
  dueDate : Date;

}



@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  providers: [ FormatDatePipe ]
})
export class TodosComponent implements OnInit {

  todos : Todo[] = [];
  loading: boolean;
  bulkDeleteActivated : boolean;
  todosToDelete : Todo[] = [];

  constructor(private todoService : TodoService) { }

  ngOnInit(): void {

    this.getTodos();

  }





  /// GET TODOS 

  // function with Rest Parameters
  /*getTodos(...params){

    /*console.log(params);
    console.log(arguments);
    console.log("---------");    
    console.log(params.length);
    console.log(arguments.length);


    this.todoService.getTodos(params).subscribe(
      res => { this.todos = res;  console.log(res) }
    )

  }*/
  
  getTodos(input?, field?, order?, done?){

    this.todos = [];
    this.loading = true;

    if ((input == undefined || input == null) && 
        (field == undefined || field == null) &&
        (order == undefined || order == null) &&
        (done == undefined || done == null) 
      ) 
    {

      this.todoService.getTodos().subscribe(
        res => { this.todos = res;  console.log(res), this.loading = false; },
        err => { console.log (err) }
      )

    } else {

      this.todoService.getTodos(input,field,order,done).subscribe(
        res => { this.todos = res;  console.log(res), this.loading = false; },
        err => { console.log (err) }
      )

    }


  }




  /// SEARCH INPUT 
  searchInput(input){

    console.log(input);


    this.todoService.getTodos(input)
        .pipe(
            map((i: any) => { return i }),
            debounceTime(300)
            )
        .subscribe(
          res => { this.todos = res;  console.log(res) }
        )

  }





  /// SET DONE 
  setDone(id,done){

    console.log(done);

    this.todoService.setDone(id, done).subscribe(
      res => { console.log(res) },
      err => console.log(err)
    )

  }



  /// DELETE TODO 
  deleteTodo(id) {

    console.log(id);

    let confirmDelete = confirm("Are you sure you want to delete this todo?");

    if(confirmDelete){

      this.todoService.deleteTodo(id).subscribe(
        res => { alert(res['message']), console.log(res), this.getTodos() }
      );

    }
    

  }




  



  addTodosToDelete(value){

    // se un todo è già presente, lo eliminiamo dalla lista
    if(this.todosToDelete.includes(value)) {
      
      this.todosToDelete.splice(this.todosToDelete.indexOf(value),1)

    } else {

      this.todosToDelete.push(value);

    }

    console.log(this.todosToDelete);

  }



  /// SUBMIT DELETE MULTIPLE TODOS
  deleteMultipleTodos(){

    let confirmDelete = confirm("Are you sure you want to delete these todos?");


    if(confirmDelete){

      this.todoService.deleteMultipleTodos(this.todosToDelete).
        subscribe(
          res => { console.log(res), this.todosToDelete = [], this.getTodos() },
          err => console.log(err)
        )

    }


    return;

  }





  displayCheckboxes(){

    this.bulkDeleteActivated = !this.bulkDeleteActivated;

  }



}
