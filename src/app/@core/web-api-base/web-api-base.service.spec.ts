import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Environment } from '@app/@core/models/environment';
import { TranslateModule } from '@ngx-translate/core';
import { CookieModule } from 'ngx-cookie';

import { WebApiBaseService } from './web-api-base.service';

describe('WebApiBaseService', () => {
  let service: WebApiBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule,
        HttpClientTestingModule,
        CookieModule.forRoot(),
      ],
      providers: [WebApiBaseService, Environment],
    });
    service = TestBed.inject(WebApiBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
