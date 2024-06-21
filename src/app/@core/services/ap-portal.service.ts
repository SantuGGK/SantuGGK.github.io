import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApPortalService {

  constructor(private _httpClient: HttpClient,
    private _injector: Injector,) { }

  /**
    * method to get invoice details
    * @returns data as observable
    */
  public getInvoiceDetails(): Observable<any> {
    return this._httpClient.get(`https://api-generator.retool.com/RVfR1t/apinvoice`);
  }

  /**
    * method to get invoice data
    * @returns data as observable
    */
  public getInvoiceData(id: number): Observable<any> {
    return this._httpClient.get(`https://api-generator.retool.com/RVfR1t/apinvoice/${id}`);
  }

  /**
    * method to update invoice details
    * @returns data as observable
    */
  public updateInvoiceDetails(payload: any): Observable<any> {
    return this._httpClient.put(`https://api-generator.retool.com/RVfR1t/apinvoice/${payload.id}`, payload);
  }

  /**
    * method to get invoice line items
    * @returns data as observable
    */
  public getInvoiceLineItems(id: number): Observable<any> {
    return this._httpClient.get(`https://api-generator.retool.com/DPGuiO/invoicelineitems?col1=${id}`);
  }

  /**
    * method to update invoice line items
    * @returns data as observable
    */
  public updateInvoiceLineItems(payload: any): Observable<any> {
    return this._httpClient.put(`https://api-generator.retool.com/DPGuiO/invoicelineitems/${payload.id}`, payload);
  }
}
