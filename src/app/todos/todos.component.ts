import { DialogComponent } from './../dialog/dialog.component';
import { FormatDatePipe } from './../custom-pipes/format-date.pipe';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { debounceTime, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';



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

  // parametri per ordinamento
  field : string;
  order_arrow : string = "arrow_upward";
  orderAscending : boolean;

  
  /// orders for select 
  orders = ['ascending','descending'];

  orderParam : string;


  constructor(private todoService : TodoService, public dialog : MatDialog) { }

  ngOnInit(): void {

    this.getTodos();

  }





  /// GET TODOS   


  /// getTodos classico con parametri opzionali 
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




  /// nuovo getTodos adattato ad Angular Material con i campi settati nel file ts e cambiati con l'ngModel




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
 

    /// Method with Angular Dialog
    const dialogRef = this.dialog.open(DialogComponent, {data : {prompt : 'deleteOnePrompt'}});

    dialogRef.afterClosed().subscribe(
      result => {
        if (result === "true"){     /// qui true viene passata come stringa dal dialog, e non come boolean
          this.todoService.deleteTodo(id).subscribe(
            res => 
                { 
                  this.dialog.open(DialogComponent, {data : {prompt : 'alertDeleteOneSuccess'}}),
                  this.getTodos()
                }
          );
        } else {
          return;
        }
      }
    )    

  }




  setDoneStyle(done){

    if(done){
      return 'toolbarDone';
    } 

    return null;

  }




  



  addTodosToDelete(value){

    console.log(value);

    // se un todo è già presente, lo eliminiamo dalla lista
    if(this.todosToDelete.includes(value)) {
      
      this.todosToDelete.splice(this.todosToDelete.indexOf(value),1)

    } else {

      this.todosToDelete.push(value);

    }

    console.log(this.todosToDelete);
    console.log(this.todosToDelete.length);

  }



  /// SUBMIT DELETE MULTIPLE TODOS
  deleteMultipleTodos(){



    /// Method with Angular Material 
    const dialogRef = this.dialog.open(DialogComponent, {data : {prompt : 'deleteManyPrompt'}});

    dialogRef.afterClosed().subscribe(

      result => {
          
        if (result === "true"){     /// qui true viene passata come stringa dal dialog, e non come boolean
          this.todoService.deleteMultipleTodos(this.todosToDelete).
              subscribe(
                  res => { console.log(res), this.todosToDelete = [], this.bulkDeleteActivated = false, this.getTodos() },
                  err => console.log(err)
            )
        } else {
          return;
        }

      },
      error => {
        alert(error)
      }

    );

    /// OLD METHOD
    /*let confirmDelete = confirm("Are you sure you want to delete these todos?");


    if(confirmDelete){

      this.todoService.deleteMultipleTodos(this.todosToDelete).
        subscribe(
          res => { console.log(res), this.todosToDelete = [], this.getTodos() },
          err => console.log(err)
        )

    }


    return;*/

  }





  displayCheckboxes(){

    this.bulkDeleteActivated = !this.bulkDeleteActivated;

    this.todosToDelete = [];

  }


  orderField(input,field,done){

    if (this.order_arrow == 'arrow_upward'){

      this.order_arrow = 'arrow_downward';
      this.getTodos(input,field,'desc',done);
      
    } else {

      this.order_arrow = 'arrow_upward';
      this.getTodos(input,field,'asc',done);

    }
  }




  testarrow(){

    this.order_arrow = "arrow_downward";

  }



  



}
