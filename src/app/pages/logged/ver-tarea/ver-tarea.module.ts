import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerTareaRoutingModule } from './ver-tarea-routing.module';
import { VerTareaComponent } from './ver-tarea.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InicialesModule } from 'src/app/components/iniciales/iniciales.module';
import { AgregarTareaModule } from 'src/app/components/agregar-tarea/agregar-tarea.module';
import { AgregarDetalleModule } from 'src/app/components/agregar-detalle/agregar-detalle.module';
import { HistorialEstadosModule } from 'src/app/components/historial-estados/historial-estados.module';
import { ComentariosTareaModule } from 'src/app/components/comentarios-tarea/comentarios-tarea.module';
import { DetallesTareaModule } from 'src/app/components/detalles-tarea/detalles-tarea.module';
@NgModule({
  declarations: [VerTareaComponent],
  imports: [
    CommonModule,
    VerTareaRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    InicialesModule,
    AgregarTareaModule,
    AgregarDetalleModule,
    HistorialEstadosModule,
    ComentariosTareaModule,
    DetallesTareaModule
  ]
})
export class VerTareaModule { }
