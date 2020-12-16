import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyaquaproductsComponent } from './buyaquaproducts.component';

describe('BuyaquaproductsComponent', () => {
  let component: BuyaquaproductsComponent;
  let fixture: ComponentFixture<BuyaquaproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyaquaproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyaquaproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
