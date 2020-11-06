import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

const routes: Routes = [
  {
    path: 'todo',
    component: TodosComponent
  },  
  {
    path: 'add-todo',
    component: AddTodoComponent
  }, 
  {
    path: 'edit-todo/:id',
    component: EditTodoComponent
  },
  {path:'',redirectTo:'todo', pathMatch: 'full' },  
  {path:'**',redirectTo:'todo', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    CommonModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
