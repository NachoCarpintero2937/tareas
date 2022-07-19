import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImprimirEstadosComponent } from './imprimir-estados.component';
const routes: Routes = [
  {
    path: '',
    component: ImprimirEstadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImprimirEstadosRoutingModule { }
