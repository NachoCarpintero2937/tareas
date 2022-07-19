import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarTareaComponent, DialogAgregarTarea } from './agregar-tarea.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSelectSearchModule } from '../mat-select-search/mat-select-search.module'

@NgModule({
  declarations: [
    AgregarTareaComponent,
    DialogAgregarTarea
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatSelectSearchModule
  ],
  exports: [AgregarTareaComponent]
})
export class AgregarTareaModule { }
