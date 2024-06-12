import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@app/shared/shared.module';
import { ApproveInvoicesComponent } from './components/approve-invoices/approve-invoices.component';
import { InvoicesCorrectionComponent } from './components/invoices-correction/invoices-correction.component';
import { ReportsComponent } from './components/reports/reports.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ApproveInvoicesComponent,
    InvoicesCorrectionComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
