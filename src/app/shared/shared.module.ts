import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AngularMaterialModule } from '@app/angular-material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@NgModule({
  declarations: [SidenavComponent, DialogBoxComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    AngularMaterialModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SidenavComponent
  ]
})
export class SharedModule { }
