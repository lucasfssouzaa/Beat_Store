import { TestBed } from '@angular/core/testing';

import { PeditemService } from './peditem.service';

describe('PeditemService', () => {
  let service: PeditemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeditemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
