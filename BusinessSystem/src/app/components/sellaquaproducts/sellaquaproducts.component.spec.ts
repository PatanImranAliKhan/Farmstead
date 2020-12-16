import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellaquaproductsComponent } from './sellaquaproducts.component';

describe('SellaquaproductsComponent', () => {
  let component: SellaquaproductsComponent;
  let fixture: ComponentFixture<SellaquaproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellaquaproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellaquaproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
