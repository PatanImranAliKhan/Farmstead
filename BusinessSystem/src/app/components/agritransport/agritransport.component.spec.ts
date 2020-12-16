import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgritransportComponent } from './agritransport.component';

describe('AgritransportComponent', () => {
  let component: AgritransportComponent;
  let fixture: ComponentFixture<AgritransportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgritransportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgritransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
