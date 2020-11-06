import { Router } from '@angular/router';
import { TodoService } from './../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorMappingService } from '../services/utilities/error-mapping.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  addTodoForm : FormGroup;


  constructor(private todoService : TodoService, private router : Router, private formBuilder : FormBuilder, private errorMapping : ErrorMappingService) { 

    this.addTodoForm = formBuilder.group(
      {
        'title': [null, Validators.compose([Validators.required, Validators.maxLength(30)])],
        'description' : [null, Validators.maxLength(50)],
        'dueDate' : [null]
      }
    )

  }
 

  ngOnInit(): void {}


  addTodo(formData) {

    console.log('Title is : ' + formData.title);
    console.log('Description is : ' + formData.description);
    console.log('Due date is : ' + formData.dueDate);

    console.log(formData);

    /// aggiungiamo il todo al db 
    this.todoService.addTodo(formData)
        .subscribe(
          res => { console.log(res), alert ("Todo added successfully!"), this.router.navigate(['/todos']) },
          err => { console.log(err), alert(this.errorMapping.mapError(err.error.description)) }
        )

 }

}
