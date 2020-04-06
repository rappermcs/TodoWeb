import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoItemService } from '../services/todo-item.service';
import { TodoItem } from '../models/todoItem';
declare let alertify: any;

@Component({
  selector: 'app-todo-item-add-edit',
  templateUrl: './todo-item-add-edit.component.html',
  styleUrls: ['./todo-item-add-edit.component.css']
})
export class TodoItemAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formTitle: string;
  formContent: string;
  itemId: number;
  errorMessage: any;
  existingTodoItem: TodoItem;
  // tslint:disable-next-line: max-line-length
  constructor(private todoItemService: TodoItemService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formContent = 'content';
    if (this.avRoute.snapshot.params[idParam]) {
      this.itemId = this.avRoute.snapshot.params[idParam];
    }
    this.form = this.formBuilder.group(
      {
        itemId: 0,
        title: ['', [Validators.required]],
        content: ['', [Validators.required]],
      }
    );
   }

  ngOnInit(): void {
    if (this.itemId > 0) {
      this.actionType = 'Edit';
      this.todoItemService.getTodoItem(this.itemId)
        .subscribe(data => (
          this.existingTodoItem = data,
          this.form.controls[this.formTitle].setValue(data.title),
          this.form.controls[this.formContent].setValue(data.content)
        ));
    }
  }

  // Creating a new todo item or editing an existing one with use actionType
  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let todoItem: TodoItem = {
        createdDate: new Date(),
        title: this.form.get(this.formTitle).value,
        content: this.form.get(this.formContent).value
      };

      this.todoItemService.saveTodoItem(todoItem)
        .subscribe((data) => {
          alertify.success('TodoItem created successfully');
          this.router.navigate(['/']);
        });
    }

    if (this.actionType === 'Edit') {
      let todoItem: TodoItem = {
        id: this.existingTodoItem.id,
        createdDate: this.existingTodoItem.createdDate,
        title: this.form.get(this.formTitle).value,
        content: this.form.get(this.formContent).value
      };
      this.todoItemService.updateTodoItem(todoItem.id, todoItem)
        .subscribe((data) => {
          alertify.success('TodoItem Updated successfully!');
          this.router.navigate(['/']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get title() { return this.form.get(this.formTitle); }
  get content() { return this.form.get(this.formContent); }

}
