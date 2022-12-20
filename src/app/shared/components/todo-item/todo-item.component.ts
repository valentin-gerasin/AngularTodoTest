import { Component, Input } from '@angular/core';

import { ITodoItem } from 'src/app/interfaces/global.interfaces';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todoItem: ITodoItem = {} as ITodoItem;
  @Input() order?: number = 1;
  @Input() isShowView?: boolean = false;
}
