import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-listado-tareas',
  templateUrl: './listado-tareas.component.html',
  styleUrls: ['./listado-tareas.component.scss']
})
export class ListadoTareasComponent implements OnInit {
  cargando: boolean[] = []
  columnas = [
    'id',
    'descripcion',
    'asignado',
    'prioridad',
    'sistema',
    'estado',
    'fecha',
    'Acciones'
  ];
  // list: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public list = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  programadores: any;
  sistemas: any;
  estados: any;
  filters: any = {
  }

  constructor(
    private _apiSv: ApiService,
    public _globalsSv: GlobalsService,
    private _fb: FormBuilder
  ) { }
  form = this._fb.group({
    Prioridad: [null],
    IdProgramador: [null],
    IdSistema: [null],
    Descripcion: [null],
    IdEstado: [null]
  })
  ngOnInit(): void {
    this.cerro();
  }
  cerro() {
    this._getProgramadores();
    this._getTareas();
    this._getSistemas();
    this._getEstados();
  }
  _getEstados() {
    this.cargando.push(true);
    this._apiSv.getEstados().then(r => {
      this.cargando.pop();
      this.estados = r;
    }).catch(e => {
      this.cargando.pop();
    });
  }
  _getSistemas() {
    this.cargando.push(true);
    this._apiSv.getSistemas().then(r => {
      this.cargando.pop();
      this.sistemas = r;
    }).catch(e => {
      this.cargando.pop();
    });
  }
  _getTareas(filtros?) {
    this.list.data = [];
    this.cargando.push(true);
    this._apiSv.getTareas(filtros).then((r: any) => {
      this.cargando.pop();
      this.list.data = r;
    }).catch(e => {
      this.cargando.pop();
    })
  }
  _getProgramadores() {
    this.cargando.push(true);
    this._apiSv.getProgramadores().then(r => {
      this.programadores = r;
      this.cargando.pop();
    }).catch(e => {
      this.cargando.pop();
    });
  }
  filtros(event, tipo) {
    switch (tipo) {
      case 'programador':
        this.filters['IdProgramador'] = event.value

        break;
      case 'prioridad':
        this.filters['Prioridad'] = event.value

        break;
      case 'sistemas':
        this.filters['IdSistema'] = event.value
        break;
      case 'descripcion':
        this.filters['Descripcion'] = this.form.get('Descripcion').value
        break;
      case 'estado':
        this.filters['IdEstado'] = event.value
      default:
        break;
    }
    this._getTareas(this.filters)
  }

  reset() {
    this.filters = {};
    this._getTareas();
    this.form.reset();
  }
  ngAfterViewInit() {
    this.list.paginator = this.paginator;
    this.list.sort = this.sort;
  }
}
