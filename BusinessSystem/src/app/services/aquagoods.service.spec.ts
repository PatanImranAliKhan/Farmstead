import { TestBed } from '@angular/core/testing';

import { AquagoodsService } from './aquagoods.service';

describe('AquagoodsService', () => {
  let service: AquagoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AquagoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
