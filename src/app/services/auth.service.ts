import { EventEmitter, Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar/';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private _http: HttpClient,
    private _globalsSv: GlobalsService,
    private _router: Router,
    private _snackbar: MatSnackBar,
  ) { }
  public logged: EventEmitter<any> = new EventEmitter();
  public viewToolbar: EventEmitter<any> = new EventEmitter();

  // esta funcion checkea que el usuario esté logueado en las rutas hijas (dentro de logged ) en caso q no lo mando pal login
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isLogged())
      return true;
    else
      this._router.navigate(['/login']);
    return false;
  }

  login(model): Promise<any> {
    return this._http.post(
      this._globalsSv.API_URL + 'tareas/pedidos/sesion',
      model
    ).toPromise();
  }


  logout(msj?) {
    localStorage.removeItem(this._globalsSv.CURRENT_USER);
    this.setCurrentUserName(false, null);
    this._router.navigate(['/login']);
    if (msj)
      this._snackbar.open(msj, 'OK', {
        duration: 2000,
      });
    else
      this._snackbar.open("Sesión cerrada correctamente", 'OK', {
        duration: 2000,
      });
  }

  // Este metodo es por si en un futuro queremos mostrar el navbar en el login y cargar datos apenas se loguea en el mismo.
  setCurrentUserName(v: boolean, data: any) {
    this.logged.emit({ status: v, datos: data });
  }

  // Devuelve true o false si el existe algo en localstorage
  isLogged() {
    var logged = localStorage.getItem(this._globalsSv.CURRENT_USER) ? JSON.parse(atob(localStorage.getItem(this._globalsSv.CURRENT_USER))) : '';
    if (logged)
      return true;
    else
      return false;
  }

  loguearse(model) {
    localStorage.setItem(this._globalsSv.CURRENT_USER, btoa(JSON.stringify({
      token: model.IdSesion,
      data: model
    })));
    this.setCurrentUserName(true, this.getCurrentUser());
    this._router.navigate(['/logged/home']);
  }

  getCurrentUser() {
    const user_data: any = localStorage.getItem(this._globalsSv.CURRENT_USER) ? JSON.parse(atob(localStorage.getItem(this._globalsSv.CURRENT_USER))) : '';
    return user_data;
  }
}
