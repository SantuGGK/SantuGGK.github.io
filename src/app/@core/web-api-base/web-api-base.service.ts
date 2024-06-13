//#region angular imports

import { EventEmitter, Injectable, Injector, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';

//#endregion angular imports

//#region core imports

import { AuthenticationHelper } from '@app/@core/helper/authentication.helper';
import { CoreConstant } from '@app/@core';

//#endregion core imports

//#region functional/model imports

import { StoreService } from '../store/store.service';
import { StorageType } from '@app/@core/enums';
import { Environment } from '@app/@core/models/environment';

//#endregion functional/model imports

/**
 * injectable decorator
 */
@Injectable()

/**
 * web api base service class
 */
export abstract class WebApiBaseService {
  //#region model properties
  /**
   * showLoaderData output decrator
   */
  @Output() showLoaderData = new EventEmitter<boolean>();

  /**
   * environment
   */
  public readonly environment: Environment;
  /**
   * _httpClient
   */
  private readonly _httpClient: HttpClient;
  /**
   * _storeService
   */
  private readonly _storeService: StoreService;
  /**
   * _retryCount
   */
  private readonly _retryCount = 0;
  /**
   * _cookieTokenName
   */
  private readonly _cookieTokenName: string;
  /**
   * _cookieService
   */
  protected readonly _cookieService: CookieService;

  /**
   * showLoader
   */
  public showLoader: boolean = false;
  /**
   * getCounterValue
   */
  public getCounterValue: any;

  //#endregion model properties

  /**
   * constructor method
   * @param httpClient 
   * @param injector 
   * @param storeService 
   * @param environment 
   */
  protected constructor(
    httpClient: HttpClient,
    injector: Injector,
    storeService: StoreService,
    environment: Environment
  ) {
    this._httpClient = httpClient;
    this._storeService = storeService;
    this._cookieService = injector.get(CookieService);
    this.environment = environment;
    this._cookieTokenName = this.environment?.cookieTokenName;
  }

  //#region protected functions

  /**
   * method to process api requests
   * @param method 
   * @param relativeApiUrl 
   * @param body 
   * @param responseContentType 
   * @param customHeaders 
   * @returns Observable
   */
  protected requestAsync<T>(
    method: string,
    relativeApiUrl: string,
    body?: any,
    responseContentType?: string,
    customHeaders: { name: string; value: string }[] = []
  ): Observable<T> {
    let getCounter = Number(
      this._storeService.getData('apiCounter', StorageType.Session)
    );
    this._storeService.setData(
      'apiCounter',
      getCounter + 1,
      StorageType.Session
    );
    if (!this.showLoader) {
      this.showLoader = true;
      this._storeService.showHideLoader(this.showLoader);
    }
    const url = this.environment.apiUrl + relativeApiUrl;
    const isSimpleJsonValue =
      typeof body === 'string' || typeof body === 'number';

    const options = {
      responseType: responseContentType || 'json',
      withCredentials: false,
      observe: 'body',
      body: isSimpleJsonValue ? JSON.stringify(body) : body,
      headers: new HttpHeaders({
        'X-JsonResponseCase':
          CoreConstant.HttpRequestHeaders.xJsonResponseCaseValue,
      }),
    };

    const token = this._cookieService.get(this._cookieTokenName);
    if (token) {
      options.headers = options.headers.append(
        CoreConstant.HttpRequestHeaders.authorization,
        CoreConstant.HttpRequestHeaders.bearer + ` ${token}`
      );
    }

    customHeaders.forEach((header) => {
      if (header.name == CoreConstant.HttpRequestHeaders.showCookie) {
        options.withCredentials = true;
      }
      options.headers.append(header.name, header.value);
    });

    if (isSimpleJsonValue) {
      options.headers.append(
        CoreConstant.HttpRequestHeaders.contentType,
        CoreConstant.HttpRequestHeaders.applicationJson
      );
    }

    return this.getResponseAsync<T>(method, url, options);
  }

  /**
   * method reads get api call
   * @param relativeApiUrl 
   * @param responseContentType 
   * @param customHeaders 
   * @returns 
   */
  protected getAsync<T>(
    relativeApiUrl: string,
    responseContentType?: string,
    customHeaders?: { name: string; value: string }[]
  ): Observable<T> {
    return this.requestAsync<T>(
      'GET',
      relativeApiUrl,
      null,
      responseContentType,
      customHeaders
    );
  }

  /**
   * method reads port api calls
   * @param relativeApiUrl 
   * @param body 
   * @param responseContentType 
   * @returns 
   */
  protected postAsync<T>(
    relativeApiUrl: string,
    body?: any,
    responseContentType?: string
  ): Observable<T> {
    return this.requestAsync<T>(
      'POST',
      relativeApiUrl,
      body,
      responseContentType
    );
  }

  /**
   * method reads put api calls
   * @param relativeApiUrl 
   * @param body 
   * @param responseContentType 
   * @returns 
   */
  protected putAsync<T>(
    relativeApiUrl: string,
    body?: any,
    responseContentType?: string
  ): Observable<T> {
    return this.requestAsync<T>(
      'PUT',
      relativeApiUrl,
      body,
      responseContentType
    );
  }

  /**
   * method reads delete api calls
   * @param relativeApiUrl 
   * @param body 
   * @param responseContentType 
   * @returns 
   */
  protected deleteAsync<T>(
    relativeApiUrl: string,
    body?: any,
    responseContentType?: string
  ): Observable<T> {
    return this.requestAsync<T>(
      'DELETE',
      relativeApiUrl,
      body,
      responseContentType
    );
  }

  //#endregion protected functions

  //#region private functions

  /**
   * methos to read api reponse
   * @param method 
   * @param url 
   * @param options 
   * @returns 
   */
  private getResponseAsync<T>(
    method: string,
    url: string,
    options: any
  ): Observable<T> {
    const responseObservable = this.sendRequestAsync<T>(method, url, options);
    return responseObservable;
  }

  /**
   * method to send api request to server
   * @param method 
   * @param url 
   * @param options 
   * @returns 
   */
  private sendRequestAsync<T>(
    method: string,
    url: string,
    options: any
  ): Observable<any> {
    return this._httpClient.request<T>(method, url, options).pipe(
      tap((data) => {
        let getCounter = Number(
          this._storeService.getData('apiCounter', StorageType.Session)
        );
        this._storeService.setData(
          'apiCounter',
          getCounter - 1,
          StorageType.Session
        );

        if (getCounter - 1 == 0) {
          this.showLoader = false;
          this._storeService.showHideLoader(this.showLoader);
        }
        if (data instanceof HttpResponse) {
          // this.variable.data = this.variable.data.filter(item => item != request.url);
          // this.stopLoader(request.url, false);
        }
      }),
      retry(this._retryCount),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * method to handle api reponse errors
   * @param error 
   * @returns 
   */
  private handleError(error: any) {
    let errorMessage = '';
    let getCounter = Number(
      this._storeService.getData('apiCounter', StorageType.Session)
    );
    this._storeService.setData(
      'apiCounter',
      getCounter - 1,
      StorageType.Session
    );
    if (getCounter - 1 == 0) {
      this.showLoader = false;
      this._storeService.showHideLoader(this.showLoader);
    }

    if (error.url.includes('exception')) {
      return throwError(() => 'error while handling exception');
    }
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.Message;
    } else {
      // Get server-side error
      // errorMessage = error.error.Message;
      errorMessage =
        typeof error.error === 'object' ? error.error.Message : error.error;

      if (!errorMessage) {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      if (error.status === CoreConstant.ClientError.UNAUTHORIZED) {
        setTimeout(() => {
          AuthenticationHelper.redirectToLoginPage(this.environment);
        }, 2000);
      }
    }
    return throwError(() => errorMessage);
  }

  //#endregion private functions
}
