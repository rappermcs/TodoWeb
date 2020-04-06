import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TodoItemService } from '../services/todo-item.service';
import { TodoItem } from '../models/todoItem';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  // $ sign in use Observable variables
  todoItem$: Observable<TodoItem>;
  itemId: number;

  // fetch id key from  querystring with ActivatedRoute
  // Dependency inject TodoItemService
  constructor(private todoItemService: TodoItemService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.itemId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.loadTodoItem();
  }

  loadTodoItem() {
    this.todoItem$ = this.todoItemService.getTodoItem(this.itemId);
  }

}
