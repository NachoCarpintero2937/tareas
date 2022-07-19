import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerTareaComponent } from './ver-tarea.component';

const routes: Routes = [
  {
    path: '',
    component: VerTareaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerTareaRoutingModule { }
