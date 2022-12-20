import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';

import { ITodoItem } from 'src/app/interfaces/global.interfaces';

const serverUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  getTodoList(): Observable<ITodoItem[]> {
    return this.httpClient
      .get<ITodoItem[]>(serverUrl + '/tasks')
      .pipe(delay(1000));
  }

  getTodoById(id: number): Observable<ITodoItem> {
    return this.httpClient.get<ITodoItem>(serverUrl + `/tasks/${id}`);
  }

  addTodo(todo: ITodoItem): Observable<ITodoItem> {
    return this.httpClient.post<ITodoItem>(serverUrl + `/tasks`, todo);
  }

  updateTodoById(todo: ITodoItem): Observable<ITodoItem> {
    return this.httpClient.patch<ITodoItem>(
      serverUrl + `/tasks/${todo.id}`,
      todo
    );
  }

  deleteTodoById(id: number): Observable<ITodoItem> {
    return this.httpClient.delete<ITodoItem>(serverUrl + `/tasks/${id}`);
  }
}
