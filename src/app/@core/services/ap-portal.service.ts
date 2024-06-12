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
    * method to get inoive details
    * @returns data as observable
    */
  public getInvoiceDetails(): Observable<any> {
   return this._httpClient.get(`https://api-generator.retool.com/uocjki/apportalinvoice`);
  }
}
