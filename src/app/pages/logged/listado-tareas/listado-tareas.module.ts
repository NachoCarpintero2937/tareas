import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoTareasRoutingModule } from './listado-tareas-routing.module';
import { ListadoTareasComponent } from './listado-tareas.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { AgregarTareaModule } from 'src/app/components/agregar-tarea/agregar-tarea.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListadoTareasComponent],
  imports: [
    CommonModule,
    ListadoTareasRoutingModule,
    MaterialModule,
    AgregarTareaModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ListadoTareasModule { }
