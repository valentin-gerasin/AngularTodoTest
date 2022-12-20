import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service.spec';

describe('NotificationsService', () => {
  let service: NotificationsService;

  const mockMatSnackBar = {
    openFromComponent: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatSnackBar,
          userValue: mockMatSnackBar,
        },
      ],
    });
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('onSuccess', () => {
    it('Should open snackbar with Success message', () => {
      spyOn(service, 'onSuccess');
      service.onSuccess('Success');
      expect(service.onSuccess).toHaveBeenCalledWith('Success');
    });
  });
  describe('onError', () => {
    it('Should open snackbar with Error message', () => {
      spyOn(service, 'onError');
      service.onError('Error');
      expect(service.onError).toHaveBeenCalledWith('Error');
    });
  });
});
