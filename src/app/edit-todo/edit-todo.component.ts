import { DateFormatService } from './../services/utilities/date-format.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from './../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMappingService } from '../services/utilities/error-mapping.service';



interface Todo {

  title : string;
  description : string;
  done : boolean;
  created : Date;
  dueDate : Date;

}



@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  todoId : string;
  todo : Todo;

  editTodoForm : FormGroup;


  constructor(private route : ActivatedRoute, private router : Router, private todoService : TodoService, private formBuilder : FormBuilder, private dateFormatService : DateFormatService, private errorMapping : ErrorMappingService) { 
    

    /// qui la inizializzo per creare la form
    this.editTodoForm = formBuilder.group(
      {
        'title': [undefined, Validators.compose([Validators.required, Validators.maxLength(25)])],
        'description' : [undefined, Validators.maxLength(50)],
        'dueDate' : [undefined]
      }
    )

  }



  ngOnInit(): void {

    this.route.params.subscribe(
      res => this.todoId = res.id
    ).add(
      this.getTodoById(this.todoId)
    )




  }



  /// GET BY ID 
  getTodoById(id){

    this.todoService.getTodoById(id).subscribe(

      res => { 
                this.todo = res, 
                console.log(res),
                /// format date to yyyy-MM-dd
                this.dateFormatService.formatDate(this.todo.dueDate),
                /// qui la inizializzo per riempire la form con i campi all'interno
                this.editTodoForm = this.formBuilder.group(
                  {
                    'title': [this.todo.title, Validators.compose([Validators.required, Validators.maxLength(30)])],
                    'description' : [this.todo.description, Validators.maxLength(50)],
                    'dueDate' : [this.dateFormatService.formatDate(this.todo.dueDate)]
                  }
                )
             }

    )

      
    /// format date to yyyy-MM-dd
    //this.dateFormatService.formatDate(this.todo.dueDate);




  }




  editTodo(formData) {

    console.log('Title is : ' + formData.title);
    console.log('Description is : ' + formData.description);
    console.log('Due date is : ' + formData.dueDate);

    console.log(formData);

    /// aggiungiamo il todo al db 
    this.todoService.editTodo(this.todoId, formData)
        .subscribe(
          res => { console.log(res), alert ("Todo edited successfully!"), this.router.navigate(["/"]) },
          err => { console.log(err), alert(this.errorMapping.mapError(err.error.description)) }
        )

 }

}
