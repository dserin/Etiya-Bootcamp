import { InvidualCustomersService } from './individual-customers.service';
import { TestBed } from '@angular/core/testing';

describe('InvidualCustomersService', () => {
  let service: InvidualCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvidualCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
