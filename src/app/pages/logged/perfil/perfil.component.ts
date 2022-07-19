import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(
    private _apiSv: ApiService,
    private _globalsSv: GlobalsService,
    private _route: ActivatedRoute,
    private _authSv: AuthService
  ) { }
  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
  id: number;
  cargando: boolean[] = [];
  programador: any;
  estados: any[];
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._getUsuario(params['id']);
      this._getEstados(params['id']);
    });

  }
  _getUsuario(id) {
    this.cargando.push(true);
    this._apiSv.getProgramadores({
      IdProgramador: id
    }).then(r => {
      this.cargando.pop();
      this.programador = r[0];
    }).catch(e => {
      this.cargando.pop();
    })
  }

  _getEstados(id) {
    this.cargando.push(true);
    this._apiSv.getTareasEstados().then((r: any) => {
      this.cargando.pop();
      this.estados = this.sort(r.filter(r => r.IdProgramador == id));

    }).catch(e => {
      this.cargando.pop();
    });
  }
  sort(r) {
    r.sort((d1, d2) => new Date(d2.Fecha).getTime() - new Date(d1.Fecha).getTime());
    return r;
  }

}
