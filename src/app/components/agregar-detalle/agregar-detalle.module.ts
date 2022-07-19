import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarDetalleRoutingModule } from './agregar-detalle-routing.module';
import { AgregarDetalleComponent, DialogAgregarDetalle } from './agregar-detalle.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    AgregarDetalleComponent,
    DialogAgregarDetalle
  ],
  imports: [
    CommonModule,
    AgregarDetalleRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CKEditorModule
  ],
  exports: [AgregarDetalleComponent]
})
export class AgregarDetalleModule { }
