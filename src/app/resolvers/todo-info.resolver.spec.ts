import { TestBed } from '@angular/core/testing';
import { TodoService } from '../services/todo/todo.service';

import { TodoInfoResolver } from './todo-info.resolver';

describe('TodoInfoResolver', () => {
  let resolver: TodoInfoResolver;
  const mockTodoService = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    });
    resolver = TestBed.inject(TodoInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
