import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ApPortalService } from '@app/@core/services/ap-portal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '@app/shared/dialog-box/dialog-box.component';

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

  @ViewChild(DialogBoxComponent) dialogBox: any

  public selectedscreen = window.location.pathname === '/invoice-correction'

  constructor(private _apPortalService: ApPortalService, private _dialog: MatDialog) {
    this.displayedColumns = ['modification'];
    this.columns = [];
    this.selectedRowImg = -1
  }

  ngOnInit(): void {
    this.getinvoices();
    this.getColumns().then((cols: any) => {
      this.displayedColumns.unshift(...cols);
      this.columns = cols;
    });
  }

  getinvoices() {
    this._apPortalService[(this.selectedscreen) ? 'getInvoiceCorrection' : 'getInvoiceDetails']().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data)
      }
    })
  }

  getColumns() {
    /*assume this is an api*/
    return new Promise((resolve, reject) => {
      resolve(['Vendor Name', 'Invoice Number', 'Invoice Date', 'Due Date', 'Payment Terms', 'PO Number', 'Net Amount', 'Total Amount', 'Currency', 'Shipping Amount']);
    });
  }

  getRecord(row: any) {
    this.selectedRowImg = row?.id
    debugger
  }
  openDialog(e: any, isApproved: boolean) {
    let data = {
      title: 'Confirmation',
      subTitle: 'Please add comment to approve the invoice',
      submitBtn: 'Approve',
      record: e
    }

    if (!isApproved) {
      data = {
        title: 'Confirmation',
        subTitle: 'Please add comment to reject the invoice',
        submitBtn: 'Reject',
        record: e
      }
    }

    const dialogRef = this._dialog.open(DialogBoxComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._apPortalService.updateInvoiceDetails({ ...e, "Approval Pending": "FALSE" }).subscribe({
          next: () => {
            this.getinvoices();
          }
        })
      }
    });

  }



}
