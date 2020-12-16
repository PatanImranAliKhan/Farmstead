import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellagrigoodsComponent } from './sellagrigoods.component';

describe('SellagrigoodsComponent', () => {
  let component: SellagrigoodsComponent;
  let fixture: ComponentFixture<SellagrigoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellagrigoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellagrigoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
