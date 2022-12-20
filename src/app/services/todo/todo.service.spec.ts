import { ITodoItem } from 'src/app/interfaces/global.interfaces';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTodoList', () => {
    it('Should fetch todolist and return an Observable<ITodoItem[]>', () => {
      const dummyTodosResponse: ITodoItem[] = [
        {} as ITodoItem,
        {} as ITodoItem,
      ];

      service.getTodoList().subscribe((response) => {
        expect(response.length).toEqual(dummyTodosResponse.length);
      });

      const req = httpMock.expectOne(`http://localhost:3000/tasks`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyTodosResponse);
    });
  });
  describe('getTodoById', () => {
    it('Should fetch todo by id and return an Observable<ITodoItem>', () => {
      const dummyTodo: ITodoItem = { id: 3 } as ITodoItem;

      service.getTodoById(dummyTodo.id).subscribe((response) => {
        expect(response.id).toEqual(dummyTodo.id);
      });

      const req = httpMock.expectOne(
        `http://localhost:3000/tasks/${dummyTodo.id}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyTodo);
    });
  });
  describe('addTodo', () => {
    it('Should post todo and return an Observable<ITodoItem> with this added todo', () => {
      const dummyTodo: ITodoItem = { id: 3 } as ITodoItem;

      service.addTodo(dummyTodo).subscribe((response) => {
        expect(response.id).toEqual(dummyTodo.id);
      });

      const req = httpMock.expectOne(`http://localhost:3000/tasks`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyTodo);
    });
  });
  describe('updateTodoById', () => {
    it('Should post todo and return an Observable<ITodoItem> with this added todo', () => {
      const dummyTodo: ITodoItem = { id: 3 } as ITodoItem;

      service.addTodo(dummyTodo).subscribe((response) => {
        expect(response.id).toEqual(dummyTodo.id);
      });

      const req = httpMock.expectOne(`http://localhost:3000/tasks`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyTodo);
    });
  });
  describe('deleteTodoById', () => {
    it('Should delete todo by id and return an Observable<ITodoItem> with deleted todo', () => {
      const dummyTodo: ITodoItem = { id: 3 } as ITodoItem;

      service.deleteTodoById(dummyTodo.id).subscribe((response) => {
        expect(response.id).toEqual(dummyTodo.id);
      });

      const req = httpMock.expectOne(
        `http://localhost:3000/tasks/${dummyTodo.id}`
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyTodo);
    });
  });
});
