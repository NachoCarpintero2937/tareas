import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DialogAgregarTarea } from 'src/app/components/agregar-tarea/agregar-tarea.component';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor
    (
      private authSv: AuthService,
      private cdRef: ChangeDetectorRef,
      public dialog: MatDialog,
      private _apiSv: ApiService,
      private alertSv: AlertService,
      private _fb: FormBuilder

    ) { }
  cargando: boolean[] = [];
  usuario = this.authSv.getCurrentUser();
  ngOnInit(): void {
    this.getTareas()
  }
  porhacer = [];
  encurso = [];
  testing = [];
  finalizado = [];
  filters: any = { IdProgramador: this.usuario.data.IdProgramador };
  hay_filtros: boolean;
  form = this._fb.group({
    Descripcion: [null],
    IdProgramador: [this.usuario.data.IdProgramador]
  });
  drop(event: CdkDragDrop<string[]>) {
    let pedido_id;
    event.previousContainer.data.forEach((element: any) => {
      pedido_id = element.IdPedido;
    });

    let estado_id;
    switch (event.container.id) {
      case 'por-hacer':
        estado_id = 2;
        break;
      case 'en-curso':
        estado_id = 3;
        break;
      case 'testing':
        estado_id = 4;
        break;
      case 'finalizado':
        estado_id = 5;
        break;
    }
    this._apiSv.setEstado({
      IdPedido: pedido_id,
      IdEstado: estado_id
    }).catch(e => {
      this.alertSv._errorMsj("Error al cambiar estado");
      this.getTareas();
    });
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  cerro() {

  }
  filtros(event, tipo) {
    switch (tipo) {
      case 'descripcion':
        this.hay_filtros = true;
        this.filters['Descripcion'] = this.form.get('Descripcion').value
        break;
      default:
        break;
    }
    this.getTareas(this.filters)
  }
  getTareas(filtros?) {
    this.cargando.push();
    this._apiSv.getTareas(this.filters).then((r: any) => {
      this.cargando.pop();
      this.porhacer = r.filter(r => r.Estado == 'Por Hacer');
      this.encurso = r.filter(r => r.Estado == 'En curso');
      this.testing = r.filter(r => r.Estado == 'Testing');
      this.finalizado = r.filter(r => r.Estado == 'Finalizado');
    }).catch((e) => {
      this.cargando.pop();
    })
  }
  detalle(id) {
    const dialogRef = this.dialog.open(DialogAgregarTarea, {
      width: '900px',
      data: {
        edit: true,
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(resultado => {
    });
  }
  clean_filters() {
    this.form.reset();
    this.hay_filtros = false;
    this.filters = {}
    this.filters['IdProgramador'] = this.usuario.data.IdProgramador;
    this.getTareas(this.filters)
  }
}

