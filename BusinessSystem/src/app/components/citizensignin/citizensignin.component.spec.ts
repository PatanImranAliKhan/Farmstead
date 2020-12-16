import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizensigninComponent } from './citizensignin.component';

describe('CitizensigninComponent', () => {
  let component: CitizensigninComponent;
  let fixture: ComponentFixture<CitizensigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizensigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizensigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
