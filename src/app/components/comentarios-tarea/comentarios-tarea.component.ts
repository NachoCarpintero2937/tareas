import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comentarios-tarea',
  templateUrl: './comentarios-tarea.component.html',
  styleUrls: ['./comentarios-tarea.component.scss']
})
export class ComentariosTareaComponent implements OnInit {

  constructor
    (
      private _fb: FormBuilder,
      private _apiSv: ApiService,
      private _alertSv: AlertService,
      private _authSv: AuthService
    ) { }
  usuario = this._authSv.getCurrentUser();
  comentarios: any = [];
  @Input() id: number;
  form = this._fb.group({
    IdPedido: [null],
    IdProgramador: [this.usuario.data.IdProgramador],
    Comentario: [null, Validators.required]
  })


  ngOnInit(): void {
    this.getComentarios(this.id);
  }
  getComentarios(id) {
    this._apiSv.getComentarios({
      IdPedido: id
    }).then(r => {
      this.comentarios = r;
    }).catch(e => {
      this.comentarios = [];
      throw new Error("Error al obtener Comentarios");
    })
  }

  setComentarios() {
    this._apiSv.setComentario({
      IdPedido: this.id,
      IdProgramador: this.usuario.data.IdProgramador,
      Comentario: this.form.get('Comentario').value
    }).then(r => {
      this.getComentarios(this.id);
      this.form.reset();
    }).catch(e => {
    });
  }

  _borrarComentario(id) {
    this._apiSv.deleteComentario(id).then(r => {
      this.getComentarios(this.id);
    }).catch(e => {
      this._alertSv._errorMsj("Error al eliminar comentario");
    });
  }

}
