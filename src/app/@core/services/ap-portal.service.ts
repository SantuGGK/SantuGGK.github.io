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
    return this._httpClient.get(`https://api-generator.retool.com/zfC6RZ/apportalinvoice?Approval Pending=TRUE`);
  }

  /**
    * method to update invoice details
    * @returns data as observable
    */
  public updateInvoiceDetails(payload: any): Observable<any> {
    return this._httpClient.put(`https://api-generator.retool.com/zfC6RZ/apportalinvoice/${payload.id}`, payload);
  }

  /**
    * method to get invoice correction
    * @returns data as observable
    */
  public getInvoiceCorrection(): Observable<any> {
    return this._httpClient.get(`https://api-generator.retool.com/zfC6RZ/apportalinvoice?Correction Needed=TRUE`);
  }
}
