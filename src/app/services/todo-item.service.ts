import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TodoItem } from '../models/todoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  myAppUrl: string;
  myApiUrl: string;
  // http requests are defined as json
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/TodoItems/';
  }

  // RxJs library in Observable interface with HttpRequest
  getTodoItems(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getTodoItem(postId: number): Observable<TodoItem> {
      return this.http.get<TodoItem>(this.myAppUrl + this.myApiUrl + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveTodoItem(todoItem): Observable<TodoItem> {
      return this.http.post<TodoItem>(this.myAppUrl + this.myApiUrl, JSON.stringify(todoItem), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateTodoItem(postId: number, todoItem): Observable<TodoItem> {
      return this.http.put<TodoItem>(this.myAppUrl + this.myApiUrl + postId, JSON.stringify(todoItem), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteTodoItem(Id: number): Observable<TodoItem> {
      return this.http.delete<TodoItem>(this.myAppUrl + this.myApiUrl + Id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }




}
