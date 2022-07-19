import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-agregar-detalle',
  templateUrl: './agregar-detalle.component.html',
  styleUrls: ['./agregar-detalle.component.scss']
})
export class AgregarDetalleComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  @Input() id: number;
  @Input() width: string;
  @Input() height: string;
  @Input() font_size: string
  @Output() onCerrado = new EventEmitter();
  submit() {
    const dialogRef = this.dialog.open(DialogAgregarDetalle, {
      width: '900px',
      data: { id: this.id }
    });
    dialogRef.afterClosed().subscribe(resultado => {
      this.onCerrado.emit();
    });
  }
}
@Component({
  selector: 'dialog-agregar-detalle',
  templateUrl: './dialog-agregar-detalle.html',
  styleUrls: ['./agregar-detalle.component.scss']
})
export class DialogAgregarDetalle implements OnInit {
  cargando: boolean[] = [];
  constructor(private dialogRef: MatDialogRef<DialogAgregarDetalle>,
    @Inject(MAT_DIALOG_DATA) public data: any = DialogAgregarDetalle,
    @Inject(DOCUMENT) private document: any,
    private _fb: FormBuilder,
    private _apiSv: ApiService,
    private _alertSv: AlertService
  ) {

  }
  public Editor = ClassicEditor;
  public imageSrc: string = '';
  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
  form = this._fb.group({
    IdPedido: [this.data.id],
    Detalle: [null, Validators.required],
    Tipo: [null]
  });
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  editorTipo() {
    this.form.get('Tipo').setValue(null);
  }
  submit() {
    this.cargando.push(true);
    this._apiSv.setDetalleTarea(this.form.getRawValue()).then((r: any) => {
      this.cargando.pop();
      if (r.IdPedido) {
        this._alertSv._succesMsj("Detalle cargado correctamente");
        this.dialogRef.close();
      }
      else {
        this._alertSv._errorMsj("Error al cargar detalle");
      }
    }).catch(e => {
      this.cargando.pop();
      this._alertSv._errorMsj("Error al cargar detalle");
    });
  }


  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      this._alertSv._errorMsj("Formato de imagen incorrecto");
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.form.get('Detalle').setValue(this.imageSrc);
    this.form.get('Tipo').setValue(2);
  }
}
