import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

// Services
import { TodoService } from 'src/app/services/todo/todo.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service.spec';

// Models
import { ITodoItem } from '../../interfaces/global.interfaces';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  public todoList: ITodoItem[] = [];

  public todoForm: FormGroup = new FormGroup({
    text: new FormControl(''),
  });

  public sortControl: FormControl = new FormControl('');

  public destroy$: Subject<void> = new Subject<void>();

  constructor(
    private todoService: TodoService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getTodoList();
    this.checkSortBy();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkSortBy(): void {
    this.sortControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (sort) => {
        if (sort === 'Created') {
          this.todoList = this.todoList.sort(
            (a, b) => b.createdAt - a.createdAt
          );
          return;
        }
        this.todoList = this.todoList.sort((a, b) => b.updatedAt - a.updatedAt);
      },
    });
  }

  getTodoList(): void {
    this.todoService.getTodoList().subscribe({
      next: (todoList) => {
        this.todoList = todoList;
      },
      error: (error) => {
        console.log('getTodoList error', error);
        this.notificationsService.onError(
          'Sorry, load list of failed. Please reload page!'
        );
      },
    });
  }

  addTodoItem(): void {
    this.todoService
      .addTodo({
        ...this.todoForm.value,
        isDone: false,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      })
      .subscribe({
        next: (todoItem) => {
          this.todoList.push(todoItem);
        },
        error: (error) => {
          console.log('addTodoItem error', error);
          this.notificationsService.onError(
            'Sorry, add item is failed. Try again!'
          );
        },
      });
  }
}
