import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComentariosTareaComponent } from './comentarios-tarea.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { InicialesModule } from '../iniciales/iniciales.module';


@NgModule({
  declarations: [ComentariosTareaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    InicialesModule,
    RouterModule,
  ],
  exports: [ComentariosTareaComponent]
})
export class ComentariosTareaModule { }
