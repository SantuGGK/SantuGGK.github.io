import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveInvoicesComponent } from './components/approve-invoices/approve-invoices.component';
import { DashboardComponent } from './dashboard.component';
import { ReportsComponent } from './components/reports/reports.component';
import { InvoicesCorrectionComponent } from './components/invoices-correction/invoices-correction.component';
import { VerifyScreenComponent } from './components/verify-screen/verify-screen.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: ReportsComponent },
      {
        path: 'approve-invoice', children: [
          { path: '', component: ApproveInvoicesComponent },
          { path: 'verify-screen/:id', component: VerifyScreenComponent },
        ]
      },
      {
        path: 'invoice-correction', children: [
          { path: '', component: ApproveInvoicesComponent },
          { path: 'verify-screen/:id', component: VerifyScreenComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
