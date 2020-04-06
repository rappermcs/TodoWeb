import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItemService } from '../services/todo-item.service';
import { TodoItem } from '../models/todoItem';
declare let alertify: any;

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent implements OnInit {
  // $ sign in use Observable variables
  todoItems$: Observable<TodoItem[]>;

  // Dependency inject TodoItemService
  constructor(private todoItemService: TodoItemService) { }

  ngOnInit(): void {
    this.loadTodoItems();
  }

  loadTodoItems() {
    this.todoItems$ = this.todoItemService.getTodoItems();
  }

  delete(Id) {
    const self = this;
    alertify.confirm('Do you want to delete item?',
    // tslint:disable-next-line: only-arrow-functions
    function(){
      self.todoItemService.deleteTodoItem(Id).subscribe((data) => {
        self.loadTodoItems();
          });
      alertify.success('TodoItem deleted!');
    },).setHeader('');
   }

}
