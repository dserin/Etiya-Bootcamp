import { TestBed } from '@angular/core/testing';

import { CorporateCustomersService } from './corporate-customers.service';

describe('CorporateCustomersService', () => {
  let service: CorporateCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
