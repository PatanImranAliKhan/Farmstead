import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AquatransportComponent } from './aquatransport.component';

describe('AquatransportComponent', () => {
  let component: AquatransportComponent;
  let fixture: ComponentFixture<AquatransportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AquatransportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AquatransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
