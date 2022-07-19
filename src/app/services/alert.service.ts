import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor
    (
      private _snackbar: MatSnackBar
    ) { }


  _errorMsj(msj) {
    this._snackbar.open(msj, 'OK', {
      duration: 2000,
      panelClass: ['error-snackbar']
    });
  }

  _succesMsj(msj) {
    this._snackbar.open(msj, 'OK', {
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }
  _info(msj) {
    this._snackbar.open(msj, 'OK', {
      duration: 2000,
    });
  }

}
