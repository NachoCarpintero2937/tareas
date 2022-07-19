import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { InicialesModule } from 'src/app/components/iniciales/iniciales.module';
import { MaterialModule } from 'src/app/components/material/material.module';


@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    InicialesModule,
    MaterialModule
  ]
})
export class PerfilModule { }
