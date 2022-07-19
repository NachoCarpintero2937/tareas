import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ver-tarea',
  templateUrl: './ver-tarea.component.html',
  styleUrls: ['./ver-tarea.component.scss']
})
export class VerTareaComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _apiSv: ApiService,
    private _authSv: AuthService,
    private _fb: FormBuilder,
    private _alertSv: AlertService
  ) { }
  cargando: boolean[] = [];
  tarea: any;
  estados: any = [];
  id: number;

  usuario = this._authSv.getCurrentUser();

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var split = params['id'].split("-");
      this.id = split[1];
      this.inicializar(split[1]);
    });
  }
  inicializar(id) {
    this.getTarea(id);
  }
  getTarea(id) {
    this.cargando.push(true);
    this._apiSv.getTareas({
      IdDesarrolloPedido: id
    }).then(r => {
      this.cargando.pop();
      this.tarea = r[0];
    }).catch(e => {
      this.cargando.pop();
      throw new Error("Error al obtener Tareas");
    });
  }
}
