import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricommerceComponent } from './agricommerce.component';

describe('AgricommerceComponent', () => {
  let component: AgricommerceComponent;
  let fixture: ComponentFixture<AgricommerceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgricommerceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgricommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
