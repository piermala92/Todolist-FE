
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { DialogComponent } from './dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from './custom-pipes/format-date.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    AddTodoComponent,
    EditTodoComponent,
    DialogComponent,
    FormatDatePipe
  ],
  imports: [ 
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
