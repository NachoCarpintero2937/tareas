import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicialesComponent } from './iniciales.component';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [InicialesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule
  ],
  exports: [InicialesComponent]
})
export class InicialesModule { }
