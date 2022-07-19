import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor
    (
      private _fb: FormBuilder,
      private _apiSv: ApiService,
      private _alertSv: AlertService,
      private _router: Router,
      private _authSv: AuthService
    ) {

    this.checklogged();
  }

  ngOnInit(): void {
  }
  form = this._fb.group({
    ClaveAcceso: ["adl83h8ads3"],
    Usuario: [null, Validators.required],
    Clave: [null, Validators.required],
    ClaveNueva: [null, Validators.required]
  });
  checklogged() {
    if (this._authSv.isLogged())
      this._router.navigate(['/logged/home'])
  }

  submit() {
    this._apiSv.setNewPassword(this.form.getRawValue()).then((r: any) => {
      if (r.Codigo == 1) {
        this._alertSv._succesMsj("Contraseña cambiada correctamente");
        this._router.navigate(['login']);
      }
    }).catch(e => {
      this._alertSv._errorMsj("Error al cambiar la contraseña");
    });
  }

}
