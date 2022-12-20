import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  const mockMatSnackBar = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent, LoaderComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: MatSnackBar, useValue: mockMatSnackBar }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
