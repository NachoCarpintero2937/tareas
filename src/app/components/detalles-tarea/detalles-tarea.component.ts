import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-detalles-tarea',
  templateUrl: './detalles-tarea.component.html',
  styleUrls: ['./detalles-tarea.component.scss']
})
export class DetallesTareaComponent implements OnInit {

  constructor
    (
      private _apiSv: ApiService,
      public dialog: MatDialog
    ) { }
  detalles: any = [];
  @Input() id: number;
  ngOnInit(): void {
    this.getDetalles(this.id);
  }

  getDetalles(id) {
    this._apiSv.getDetalleTarea({
      IdPedido: id
    }).then(r => {
      this.detalles = r;
    }).catch(e => {
      throw new Error("Error al obtener detalles");
    });
  }
  abrirImagen(base64) {
    const dialogRef = this.dialog.open(DialogVerImagen, {
      width: '900px',
      data: { base64: base64 }
    });
    dialogRef.afterClosed().subscribe(resultado => {
    });
  }

}
@Component({
  selector: 'app-dialog-ver-imagen',
  templateUrl: './dialog-ver-imagen.component.html',
  styleUrls: ['./detalles-tarea.component.scss']
})
export class DialogVerImagen implements OnInit {
  constructor(private dialogRef: MatDialogRef<DialogVerImagen>,
    @Inject(MAT_DIALOG_DATA) public data: any = DialogVerImagen,
    @Inject(DOCUMENT) private document: any,

  ) {

  }
  cargando: boolean[] = [];
  ngOnInit() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}