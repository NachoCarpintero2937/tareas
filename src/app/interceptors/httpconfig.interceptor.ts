import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalsService } from '../services/globals.service';
import { Observable, throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {

  constructor
    (
      private _authSv: AuthService,
      private _router: Router,
      private _alertSv: AlertService,
      private _globalsSv: GlobalsService
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user_data: any = localStorage.getItem(this._globalsSv.CURRENT_USER) ? JSON.parse(atob(localStorage.getItem(this._globalsSv.CURRENT_USER))) : '';
    if (user_data.token) {
      request = request.clone({
        setHeaders: {
          "x-api-key": user_data.token
        },
        body: request.body
      });
    }
    return next.handle(request).pipe(
      map(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // cacheo de estado
            if (event && event.body && typeof event.body.status != 'undefined' && !event.body.status && !event.body.error && typeof event.body.error != 'undefined') {
              if (event && event.body && typeof event.body.message != 'undefined') {
                this._alertSv._errorMsj(event.body.data.respuesta);
              } else {
                this._alertSv._errorMsj("Hubo un error en la solicitud");

              }
            }
          }
          return event;
        }
      ),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 500:
            this._alertSv._errorMsj("Error en el servidor (500)");
            break;
          case 403:
            this._authSv.logout("Sesión expirada,ingrese nuevamente");
            break;
          case 404:
            if (error.error.code == 4) {
              this._alertSv._info("Debe cambiar la contraseña para continuar");
              this._router.navigate(['cambiar-password']);
            } else {
              this._alertSv._errorMsj(error.error.message_detail);
            }
            break;
          default:
            this._alertSv._errorMsj("Error intente nuevamente más tarde");
            break;
        }
        return throwError(new Error(error.error.message));
      }))
  }
}
