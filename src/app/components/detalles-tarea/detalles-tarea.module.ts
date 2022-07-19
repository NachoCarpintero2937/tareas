import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetallesTareaComponent, DialogVerImagen } from './detalles-tarea.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { InicialesModule } from '../iniciales/iniciales.module';
import { AgregarDetalleModule } from '../agregar-detalle/agregar-detalle.module';
@NgModule({
  declarations: [
    DetallesTareaComponent,
    DialogVerImagen
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    InicialesModule,
    AgregarDetalleModule
  ],
  exports: [DetallesTareaComponent]
})
export class DetallesTareaModule { }
