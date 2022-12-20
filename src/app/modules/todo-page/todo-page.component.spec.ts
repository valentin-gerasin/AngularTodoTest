import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TodoPageComponent } from './todo-page.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';

describe('TodoPageComponent', () => {
  let component: TodoPageComponent;
  let fixture: ComponentFixture<TodoPageComponent>;

  const mockActivatedRoute = {
    params: of({ id: 123 }),
    data: of({
      text: 'New task',
      isDone: false,
      createdAt: 1671550176251,
      updatedAt: 1671550176251,
      id: 123,
    }),
  };

  const mockMatSnackBar = {};

  const mockMatDialogModule = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoPageComponent],
      imports: [HttpClientTestingModule],

      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: MatSnackBar,
          useValue: mockMatSnackBar,
        },
        {
          provide: MatDialog,
          useValue: mockMatDialogModule,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
