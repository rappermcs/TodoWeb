import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoItemAddEditComponent } from './todo-item-add-edit/todo-item-add-edit.component';
import { TodoItemService } from './services/todo-item.service';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemsComponent,
    TodoItemComponent,
    TodoItemAddEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [TodoItemService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
