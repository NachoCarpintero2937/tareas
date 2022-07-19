import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoTareasComponent } from './listado-tareas.component';

const routes: Routes = [{
  path: '',
  component: ListadoTareasComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListadoTareasRoutingModule { }
