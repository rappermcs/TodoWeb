import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoItemAddEditComponent } from './todo-item-add-edit/todo-item-add-edit.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';


// Route Configurations
const routes: Routes = [
  { path: '', component: TodoItemsComponent, pathMatch: 'full', canActivate: [LoginGuard]  },
  { path: 'todoitem/:id', component: TodoItemComponent, canActivate: [LoginGuard]},
  { path: 'add', component: TodoItemAddEditComponent, canActivate: [LoginGuard]},
  { path: 'todoitem/edit/:id', component: TodoItemAddEditComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
