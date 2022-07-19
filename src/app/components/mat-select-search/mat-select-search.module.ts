import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectSearchComponent } from './mat-select-search.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [MatSelectSearchComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [MatSelectSearchComponent]
})
export class MatSelectSearchModule { }
