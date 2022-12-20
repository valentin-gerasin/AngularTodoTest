import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoInfoResolver } from './resolvers/todo-info.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/todo-list/todo-list.module').then(
        (m) => m.TodoListModule
      ),
  },
  {
    path: 'todo/:id',
    loadChildren: () =>
      import('./modules/todo-page/todo-page.module').then(
        (m) => m.TodoPageModule
      ),
    resolve: {
      todoInfo: TodoInfoResolver,
    },
  },
  {
    path: '404',
    loadChildren: () =>
      import('./modules/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
