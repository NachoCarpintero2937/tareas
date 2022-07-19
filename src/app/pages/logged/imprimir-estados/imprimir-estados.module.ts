import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImprimirEstadosRoutingModule } from './imprimir-estados-routing.module';
import { ImprimirEstadosComponent } from './imprimir-estados.component';
import { MaterialModule } from 'src/app/components/material/material.module';


@NgModule({
  declarations: [ImprimirEstadosComponent],
  imports: [
    CommonModule,
    ImprimirEstadosRoutingModule,
    MaterialModule
  ]
})
export class ImprimirEstadosModule { }
