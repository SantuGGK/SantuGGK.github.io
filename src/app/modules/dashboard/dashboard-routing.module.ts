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
      { path: '', component: ApproveInvoicesComponent },
      { path: 'invoice-correction', component: InvoicesCorrectionComponent },
      { path: 'reports', component: ReportsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
