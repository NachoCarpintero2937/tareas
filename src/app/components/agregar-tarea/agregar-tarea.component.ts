import { Clipboard } from '@angular/cdk/clipboard';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.component.html',
  styleUrls: ['./agregar-tarea.component.scss']
})
export class AgregarTareaComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }
  @Input() id: number;
  @Input() width: string;
  @Input() height: string;
  @Input() font_size: string
  @Output() onCerrado = new EventEmitter();
  ngOnInit(): void {
  }
  submit() {
    const dialogRef = this.dialog.open(DialogAgregarTarea, {
      width: '900px',
      data: { edit: this.id ? true : false, id: this.id }
    });
    dialogRef.afterClosed().subscribe(resultado => {
      this.onCerrado.emit();
    });
  }
}
@Component({
  selector: 'dialog-agregar-tarea',
  templateUrl: './dialog-agregar-tarea.html',
  styleUrls: ['./agregar-tarea.component.scss']
})
export class DialogAgregarTarea implements OnInit {
  cargando: boolean[] = [];
  constructor
    (
      private dialogRef: MatDialogRef<DialogAgregarTarea>,
      @Inject(MAT_DIALOG_DATA) public data: any = DialogAgregarTarea,
      @Inject(DOCUMENT) private document: any,
      private router: Router,
      private clipboard: Clipboard,
      private alertSv: AlertService,
      private _fb: FormBuilder,
      private _authSv: AuthService,
      private _apiSv: ApiService,
      public _globalsSv: GlobalsService,

  ) {
  }
  usuario = this._authSv.getCurrentUser();
  tarea: any;
  form = this._fb.group({
    Pedido: [null, Validators.required],
    IdProgramador: [null, Validators.required],
    Prioridad: [null, Validators.required],
    IdUsuarioPedido: [null, Validators.required],
    IdSistema: [null, Validators.required],
    IdEstado: [1]
  });
  cdkVirtualScrollViewPort: CdkVirtualScrollViewport;
  public filtro_options: FormControl = new FormControl();
  listado_usuarios: any;
  usuarios: any;
  tarea_id: number;
  programadores: any;
  estados: any;
  sistemas: any;
  selectedStates: any;
  ngOnInit(): void {
    this._getUsers();
    this._getProgramadores();
    this._getEstados();
    this._getSistemas();
  }

  onKey(value) {
    this.selectedStates = this.search(value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.usuarios.filter(option => option.Nombre.toLowerCase().startsWith(filter));
  }
  onNoClick(): void {
    this.dialogRef.close();
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
  _getProgramadores() {
    this._apiSv.getProgramadores().then((r: any) => {
      this.programadores = r;
      this.form.get('IdProgramador').setValue(this.usuario.data.IdProgramador);
    }).catch(e => {
      this.cargando.pop();
    });
  }
  _getUsers() {
    var users;
    this.cargando.push(true);
    this._apiSv.getUsuarios().then((r: any) => {
      this.cargando.pop();
      this.usuarios = r.filter(r => r.IdEstado == 1);
      this.selectedStates = this.usuarios;
      this.checkEdit();
    }).catch((e) => {
      this.cargando.pop();
    });
  }
  _getEstados() {
    this.cargando.push(true);
    this._apiSv.getEstados().then((r) => {
      this.cargando.pop();
      this.estados = r;
    }).catch(e => {
      this.cargando.pop();
    });
  }
  checkEdit() {
    if (this.data.edit) {
      this._getEditTarea()
    }
  }
  _getEditTarea() {
    this.cargando.push(true);
    this._apiSv.getTareas({
      IdDesarrolloPedido: this.data.id
    }).then(r => {
      this.cargando.pop();
      this._prepararFormEdit(r);
    }).catch(e => {
      this.cargando.pop();
      throw "Error al obtener tarea";
    });

  }
  _prepararFormEdit(r) {
    this.tarea = r[0];
    this.tarea_id = r[0].IdPedido;
    this.form.get("Pedido").setValue(r[0].Pedido);
    this.form.get("IdUsuarioPedido").setValue(r[0].IdUsuarioPedido);
    this.form.get("Prioridad").setValue(r[0].Prioridad);
    this.form.get('IdProgramador').setValue(r[0].IdProgramador);
    this.form.get('IdEstado').setValue(r[0].IdEstado);
    this.form.get('IdSistema').setValue(r[0].IdSistema);
  }
  copy() {
    this.clipboard.copy(location.href);
    this.alertSv._info("Url copiado");
  }

  submit() {
    if (this.form.valid) {
      this.cargando.push(true);
      if (!this.data.edit) {
        this._apiSv.setTarea(this.form.getRawValue()).then((r: any) => {
          this.cargando.pop();
          if (r.IdPedido) {
            this.setEstado(r.IdPedido);
            this.alertSv._succesMsj("Tarea cargada correctamente");
          }
          else {
            this.alertSv._errorMsj("Error al cargar tarea");
          }
          this.onNoClick();
        }).catch(e => {
          this.cargando.pop();
          this.alertSv._errorMsj("Hubo un error al cargar la tarea");

        });
      } else {
        this._apiSv.putTarea(this.data.id, this.form.getRawValue()).then((r: any) => {
          this.cargando.pop();
          // Valido que el
          if (this.tarea.IdEstado != this.form.get('IdEstado').value)
            this._editarEstado(this.data.id)

          if (r.IdPedido)
            this.alertSv._succesMsj("Tarea editada correctamente");
          else
            this.alertSv._errorMsj("Error al editar tarea");

          this.onNoClick();
        }).catch(e => {
          this.cargando.pop();
        });
      }
    } else {
      this.alertSv._errorMsj("Complete todos los campos para continuar")
    }
  }
  // seteamos el estado en pendiente
  setEstado(IdTarea) {
    this._apiSv.setEstado({
      IdPedido: IdTarea,
      IdEstado: 1
    }).catch(e => {
    });
  }
  _editarEstado(id) {
    this._apiSv.setEstado({
      IdPedido: id,
      IdEstado: this.form.get('IdEstado').value
    }).then(r => {
    }).catch(e => {

    });
  }
}
