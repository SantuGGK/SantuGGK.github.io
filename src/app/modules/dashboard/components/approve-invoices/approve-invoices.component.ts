import { Component, OnInit } from '@angular/core';
import { ApPortalService } from '@app/@core/services/ap-portal.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-approve-invoices',
  templateUrl: './approve-invoices.component.html',
  styleUrls: ['./approve-invoices.component.scss']
})
export class ApproveInvoicesComponent implements OnInit {

  displayedColumns: string[]
  columns: string[]
  dataSource: any

  constructor(private _apPortalService: ApPortalService) {
    this.displayedColumns = ['modification'];
    this.columns = []
  }

  ngOnInit(): void {
    this._apPortalService.getInvoiceDetails().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data)
      },
      error: () => {

      }
    })
    this.getColumns().then((cols: any) => {
      this.displayedColumns.unshift(...cols);
      this.columns = cols;
    });
  }
  getColumns() {
    /*assume this is an api*/
    return new Promise((resolve, reject) => {
      resolve(['Vendor Name', 'Invoice Number', 'Invoice Date', 'Due Date', 'Payment Terms', 'PO Number', 'Net Amount', 'Total Amount', 'Currency', 'Shipping Amount', 'Items']);
    });
  }
}
