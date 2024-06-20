import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ApPortalService } from '@app/@core/services/ap-portal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '@app/shared/dialog-box/dialog-box.component';
import { concat } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approve-invoices',
  templateUrl: './approve-invoices.component.html',
  styleUrls: ['./approve-invoices.component.scss']
})
export class ApproveInvoicesComponent implements OnInit {

  displayedColumns: string[]
  columns: string[]
  dataSource: any;
  selectedRowImg: number;
  cindex: number;
  incomingData: any;
  isLoading: boolean;

  @ViewChild(DialogBoxComponent) dialogBox: any

  public selectedscreen = window.location.pathname === '/invoice-correction'

  constructor(private _apPortalService: ApPortalService, private _dialog: MatDialog, private _router: Router) {
    this.displayedColumns = ['modification'];
    this.columns = [];
    this.selectedRowImg = -1
    this.cindex = -1
    this.incomingData = [];
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.getinvoices();
    this.getColumns().then((cols: any) => {
      this.displayedColumns.unshift(...cols);
      this.columns = cols;
    });
  }

  getinvoices() {
    this._apPortalService.getInvoiceDetails().subscribe({
      next: (data) => {
        this.isLoading = false
        this.incomingData = data
        let newData = this.selectedscreen ? (data.filter((s: any) => s.CorrectionNeeded === 'TRUE')) :
          (data.filter((s: any) => s.ApprovalPending === 'TRUE'));
        this.dataSource = new MatTableDataSource(newData)
      }
    })
  }

  getColumns() {
    /*assume this is an api*/
    return new Promise((resolve, reject) => {
      resolve(['Vendor Name', 'Invoice Number', 'Invoice Date', 'Due Date', 'Payment Terms', 'PO Number', 'Net Amount', 'Total Amount', 'Currency', 'Shipping Amount']);
    });
  }

  getRecord(row: any, index: number) {
    this.selectedRowImg = row?.id
    this.cindex = index
    this.selectedscreen ? this._router.navigate(["/invoice-correction/verify-screen", row?.id]) :
      this._router.navigate(["/approve-invoice/verify-screen", row?.id])
  }
  openDialog(e: any, isApproved: boolean) {
    let data = {
      title: 'Confirmation',
      subTitle: 'Please add comment to approve the invoice',
      submitBtn: 'Approve',
      record: e
    }

    let payload = { ...e, "ApprovalPending": "FALSE" }

    if (!isApproved) {
      data = {
        title: 'Confirmation',
        subTitle: 'Please add comment to reject the invoice',
        submitBtn: 'Reject',
        record: e
      }
    }

    if (this.selectedscreen) {
      data = {
        title: 'Confirmation',
        subTitle: 'Are you sure , you want to send this invoice for approval',
        submitBtn: 'Approve',
        record: e
      }
      payload = { ...e, "ApprovalPending": "TRUE", "CorrectionNeeded": "FALSE" }
    }

    const dialogRef = this._dialog.open(DialogBoxComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._apPortalService.updateInvoiceDetails(payload).subscribe({
          next: () => {
            // this.isLoading = false
            this.getinvoices();
          }
        })
      }
    });

  }

  onResetClick() {
    this.incomingData.map((t: any) => {
      if (t.id === 1 || t.id === 3) {
        t.ApprovalPending = 'TRUE'
        t.CorrectionNeeded = 'FALSE'
      } else {
        t.ApprovalPending = 'FALSE'
        t.CorrectionNeeded = 'TRUE'
      }
    })

    const serviceCall1 = this._apPortalService.updateInvoiceDetails(this.incomingData[0]);
    const serviceCall2 = this._apPortalService.updateInvoiceDetails(this.incomingData[1]);
    const serviceCall3 = this._apPortalService.updateInvoiceDetails(this.incomingData[2]);
    const serviceCall4 = this._apPortalService.updateInvoiceDetails(this.incomingData[3]);

    concat(serviceCall1, serviceCall2, serviceCall3, serviceCall4).subscribe({
      next: () => {
        this.getinvoices();
      },
      error: err => console.error(err.message)
    });

  }



}
