import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveInvoicesComponent } from './components/approve-invoices/approve-invoices.component';
import { DashboardComponent } from './dashboard.component';
import { ReportsComponent } from './components/reports/reports.component';
import { InvoicesCorrectionComponent } from './components/invoices-correction/invoices-correction.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: ReportsComponent },
      { path: 'approve-invoice', component: ApproveInvoicesComponent },
      { path: 'invoice-correction', component: ApproveInvoicesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
