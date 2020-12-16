import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyagrigoodsComponent } from './buyagrigoods.component';

describe('BuyagrigoodsComponent', () => {
  let component: BuyagrigoodsComponent;
  let fixture: ComponentFixture<BuyagrigoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyagrigoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyagrigoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
