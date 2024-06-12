import { TestBed } from '@angular/core/testing';

import { ApPortalService } from './ap-portal.service';

describe('ApPortalService', () => {
  let service: ApPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
