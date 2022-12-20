import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

//Components
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { LoaderComponent } from './components/loader/loader.component';

// Material modules
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    TodoItemComponent,
    DeleteItemComponent,
    SnackBarComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink,
  ],
  exports: [
    TodoItemComponent,
    DeleteItemComponent,
    SnackBarComponent,
    LoaderComponent,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink,
  ],
})
export class SharedModule {}
