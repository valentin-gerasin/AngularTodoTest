import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

// Components
import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';

// Services
import { TodoService } from 'src/app/services/todo/todo.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service.spec';

// Models
import { ITodoItem } from '../../interfaces/global.interfaces';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent implements OnInit {
  public todoItem: ITodoItem | null = null;
  public isEditState: boolean = false;

  public infoForm: FormGroup = new FormGroup({
    text: new FormControl(''),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationsService: NotificationsService,
    private todoService: TodoService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTodoInfo();
  }

  getTodoInfo(): void {
    this.activatedRoute.data.pipe(first()).subscribe({
      next: (routeData: { todoInfo?: ITodoItem | null }) => {
        this.todoItem = routeData?.todoInfo || null;
      },
    });
  }

  toggleEditState(): void {
    this.isEditState = !this.isEditState;
    this.infoForm.patchValue({ text: this.todoItem?.text });
  }

  openDeleteDialog(): void {
    this.matDialog
      .open(DeleteItemComponent)
      .afterClosed()
      .pipe(first())
      .subscribe({
        next: (status) => {
          console.log(status);
          if (!status) return;
          this.deleteTodo();
        },
      });
  }

  deleteTodo(): void {
    if (!this.todoItem) return;
    this.todoService.deleteTodoById(this.todoItem.id).subscribe({
      next: (res) => {
        this.notificationsService.onSuccess('Successfully deleted!');
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log('deleteTodo error', error);
        this.notificationsService.onError(
          'Sorry, something went wrong. Please reload page and try again!'
        );
      },
    });
  }

  saveData(): void {
    if (!this.todoItem) return;
    this.todoService
      .updateTodoById({
        ...this.todoItem,
        ...this.infoForm.value,
        updatedAt: new Date().getTime(),
      })
      .subscribe({
        next: (res) => {
          this.toggleEditState();
          this.notificationsService.onSuccess('Successfully saved!');
          this.todoItem!.text = res.text;
        },
        error: (error) => {
          console.log('saveData error', error);
          this.isEditState = false;
          this.notificationsService.onError(
            'Sorry, something went wrong. Please reload page and try again!'
          );
        },
      });
  }

  toggleDoneState(): void {
    if (!this.todoItem) return;
    this.todoService
      .updateTodoById({
        ...this.todoItem,
        updatedAt: new Date().getTime(),
        isDone: !this.todoItem.isDone,
      })
      .subscribe({
        next: (res) => {
          this.notificationsService.onSuccess('Successfully updated!');
          this.todoItem!.isDone = res.isDone;
        },
        error: (error) => {
          console.log('toggleDoneState error', error);
          this.notificationsService.onError(
            'Sorry, something went wrong. Please reload page and try again!'
          );
        },
      });
  }
}
