import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoPageComponent } from './todo-page.component';
import { TodoPageRoutingModule } from './todo-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodoPageComponent],
  imports: [
    CommonModule,
    TodoPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class TodoPageModule {}
