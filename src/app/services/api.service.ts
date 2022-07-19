import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private _http: HttpClient,
    private _globalsSv: GlobalsService,
  ) { }
  private _postAction(model, action_name) {
    return this._http.post(
      this._globalsSv.API_URL + action_name,
      model
    ).toPromise();
  }
  private _getAction(model, action_name) {
    const options = {
      params: model
    }
    return this._http.get(
      this._globalsSv.API_URL + action_name, options
    ).toPromise();
  }

  private _putAction(model, action_name) {
    return this._http.put(
      this._globalsSv.API_URL + action_name,
      model
    ).toPromise();
  }
  private _deleteAction(model, action_name) {
    return this._http.delete(
      this._globalsSv.API_URL + action_name
    ).toPromise();
  }
  /*
   ---------------------------------------------
   |                                           |
   |                 GETTERS                   |
   |                                           |
   ---------------------------------------------
   */
  public getTareas(model?) {
    return this._getAction(model, "tareas/pedidos/search")
  }
  public getUsuarios(model?) {
    return this._getAction(model, "adm/usuarios/search/")
  }
  public getProgramadores(model?) {
    return this._getAction(model, "tareas/programadores/search/")
  }
  public getEstados(model?) {
    return this._getAction(model, "tareas/estados/search/")
  }
  public getTareasEstados(model?) {
    return this._getAction(model, "tareas/pedidos/estados/search/")
  }
  public getDetalleTarea(model?) {
    return this._getAction(model, "tareas/pedidos/detalles/search/");
  }
  public getSistemas(model?) {
    return this._getAction(model, "tareas/sistemas/search/");
  }
  public getComentarios(model?) {
    return this._getAction(model, "tareas/pedidos/comentarios/search/");
  }
  // 
  /*
 ---------------------------------------------
 |                                           |
 |                 POST                      |
 |                                           |
 ---------------------------------------------
 */

  public setTarea(model?) {
    return this._postAction(model, "tareas/pedidos/")
  }
  public setEstado(model) {
    return this._postAction(model, "tareas/pedidos/estados/")
  }
  public setDetalleTarea(model) {
    return this._postAction(model, "tareas/pedidos/detalles/");
  }
  public setComentario(model) {
    return this._postAction(model, "tareas/pedidos/comentarios/");
  }
  public setNewPassword(model) {
    return this._postAction(model, "tareas/pedidos/sesion/");
  }

  /*
 ---------------------------------------------
 |                                           |
 |                 PUTS                      |
 |                                           |
 ---------------------------------------------
 */

  public putTarea(id, model?) {
    return this._putAction(model, "tareas/pedidos/" + id)
  }
  /*
  ---------------------------------------------
  |                                           |
  |               DELETES                     |
  |                                           |
  ---------------------------------------------
  */
  public deleteComentario(id, model?) {
    return this._deleteAction(model, "tareas/pedidos/comentarios/" + id)
  }
}
