import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { TodoService } from '../services/todo/todo.service';
import { ITodoItem } from '../interfaces/global.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TodoInfoResolver implements Resolve<ITodoItem | null> {
  constructor(private todoService: TodoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ITodoItem | null> {
    const todoId = route.paramMap.get('id');
    return this.todoService
      .getTodoById(todoId ? +todoId : 0)
      .pipe(catchError((error) => of(null)));
  }
}
