import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { GlobalsService } from '../../../services/globals.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {

    this.checklogged();
  }

  // generamos un formulario dinamico , para validar solo hace faltar el validators , no hacen faltas ifs ni nada.
  form = this._fb.group({
    Usuario: [null, Validators.required],
    Clave: [null, Validators.required],
    ClaveAcceso: ['adl83h8ads3']
  })
  // "ClaveAcceso": "adl83h8ads3",
  // "Usuario": "aalarcon",
  // "Clave": "1234"
  ngOnInit() {
  }

  checklogged() {
    if (this._auth.isLogged())
      this._router.navigate(['/logged/home'])
  }

  submit() {
    if (this.form.valid) {
      this._auth.login(
        this.form.getRawValue()
      ).then((resp: any) => {
        if (!resp.error) {
          this._auth.loguearse(resp);
        }
      });
    }
  }
}
