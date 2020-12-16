import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AquacommerceComponent } from './aquacommerce.component';

describe('AquacommerceComponent', () => {
  let component: AquacommerceComponent;
  let fixture: ComponentFixture<AquacommerceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AquacommerceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AquacommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
