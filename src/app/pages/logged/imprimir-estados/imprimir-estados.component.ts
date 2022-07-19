import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-imprimir-estados',
  templateUrl: './imprimir-estados.component.html',
  styleUrls: ['./imprimir-estados.component.scss']
})
export class ImprimirEstadosComponent implements OnInit, AfterViewInit {

  constructor
    (
      private _route: ActivatedRoute,
      private _apiSv: ApiService,
      private _authSv: AuthService,
      private _alertSv: AlertService
    ) { }
  id: number;
  estados: any = [];
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var split = params['id'].split("-");
      this.id = split[1];
      this._getEstados(split[1]);
      this._authSv.viewToolbar.emit(true)
    });
  }

  _getEstados(id) {
    this._apiSv.getTareasEstados({
      IdPedido: id
    }).then(r => {
      this.estados = r;
    }).catch(e => {
      throw new Error("Error al obtener los estados");
    });
  }
  getHTML() {
    let printContents = document.getElementById('estados').innerHTML;
    return `
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="keywords" content="HTML,CSS">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title> Historial estado VB-`+ this.id + `</title>
      <style>
        .no-imprimir {
          display: none!important;
        }
      </style>
    </head>
    <body onload="window.print();">
      ${printContents}
    </body>
  </html>`;
  }
  ngAfterViewInit() {

  }
  imprimir() {
    window.print();
  }
}

