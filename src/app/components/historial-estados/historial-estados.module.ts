import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialEstadosComponent } from './historial-estados.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [HistorialEstadosComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [HistorialEstadosComponent]
})
export class HistorialEstadosModule { }
