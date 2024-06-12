import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AngularMaterialModule } from '@app/angular-material.module';
import { FormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    AngularMaterialModule
  ],
  exports: [
    FormsModule,
    AngularMaterialModule,
    SidenavComponent
  ]
})
export class SharedModule { }
