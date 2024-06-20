import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApPortalService } from '@app/@core/services/ap-portal.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '@app/shared/dialog-box/dialog-box.component';

@Component({
  selector: 'app-verify-screen',
  templateUrl: './verify-screen.component.html',
  styleUrls: ['./verify-screen.component.scss']
})
export class VerifyScreenComponent implements OnInit {

  public selectedRowImg: number;
  public form = this._formBuilder.group({
    vendorName: ['', []],
    invoiceNumber: ['', []],
    invoiceDate: ['', []],
    dueDate: ['', []],
    paymentTerms: ['', []],
    poNumber: ['', []],
    netAmount: ['', []],
    totalAmount: ['', []],
    taxAmount: ['', []],
    currency: ['', []],
    shippingAmount: ['', []],
    items: ['', []]
  });
  public selectedscreen = window.location.pathname
  public isCorrectionScreen = this.selectedscreen.split('/')[1] === 'invoice-correction'


  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder,
    private _apPortalService: ApPortalService, private _dialog: MatDialog) {
    this.selectedRowImg = -1
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.selectedRowImg = params['id'];
    });
    this.getInvoiceDetails()
  }

  getInvoiceDetails() {
    this._apPortalService.getInvoiceData(this.selectedRowImg).subscribe({
      next: (data) => {
        this.form.patchValue({
          vendorName: data['Vendor Name'],
          invoiceNumber: data['Invoice Number'],
          invoiceDate: data['Invoice Date'],
          dueDate: data['Due Date'],
          paymentTerms: data['Payment Terms'],
          poNumber: data['PO Number'],
          netAmount: data['Net Amount'],
          totalAmount: data['Total Amount'],
          taxAmount: data['Tax Amount'],
          currency: data['Currency'],
          shippingAmount: data['Shipping Amount'],
          items: data['Items']
        });
      }
    })
  }

  submit(formData: any) {
    if (formData.status === "VALID") {
    }
  }

  openDialog(isApproved?: boolean) {
    let formData: any = {
      'Vendor Name': this.form.value.vendorName,
      'Invoice Number': this.form.value.invoiceNumber,
      'Invoice Date': this.form.value.invoiceDate,
      'Due Date': this.form.value.dueDate,
      'Payment Terms': this.form.value.paymentTerms,
      'PO Number': this.form.value.poNumber,
      'Net Amount': this.form.value.netAmount,
      'Total Amount': this.form.value.totalAmount,
      'Currency': this.form.value.currency,
      'Shipping Amount': this.form.value.shippingAmount,
      'Items': this.form.value.items,
      'id':this.selectedRowImg
    }

    let data = {
      title: 'Confirmation',
      subTitle: 'Please add comment to approve the invoice',
      submitBtn: 'Approve'
    }

    let payload = { ...formData, "ApprovalPending": "FALSE" }

    if (!isApproved) {
      data = {
        title: 'Confirmation',
        subTitle: 'Please add comment to reject the invoice',
        submitBtn: 'Reject'
      }
    }

    if (this.isCorrectionScreen) {
      data = {
        title: 'Confirmation',
        subTitle: 'Are you sure , you want to send this invoice for approval',
        submitBtn: 'Approve'
      }
      payload = { ...formData, "ApprovalPending": "TRUE", "CorrectionNeeded": "FALSE" }
    }

    const dialogRef = this._dialog.open(DialogBoxComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._apPortalService.updateInvoiceDetails(payload).subscribe({
          next: () => {
            let url = this.isCorrectionScreen? '/invoice-correction':'/approve-invoice'
            this._router.navigate([url])
          }
        })
      }
    });

  }

}
