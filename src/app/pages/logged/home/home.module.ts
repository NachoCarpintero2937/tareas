import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AgregarTareaModule } from '../../../components/agregar-tarea/agregar-tarea.module'
import { PipesModule } from '../../../pipes/pipes.module';
import { InicialesModule } from 'src/app/components/iniciales/iniciales.module'
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    AgregarTareaModule,
    InicialesModule
  ]
})
export class HomeModule { }
