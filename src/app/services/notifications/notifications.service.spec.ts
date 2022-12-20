import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private snackBarCustomData: MatSnackBarConfig = {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 5000,
  };

  constructor(private matSnackBar: MatSnackBar) {}

  onSuccess(message: string): void {
    this.matSnackBar.openFromComponent(SnackBarComponent, {
      ...this.snackBarCustomData,
      panelClass: 'success-snackbar',
      data: { message },
    });
  }

  onError(message: string): void {
    this.matSnackBar.openFromComponent(SnackBarComponent, {
      ...this.snackBarCustomData,
      panelClass: 'error-snackbar',
      data: { message },
    });
  }
}
