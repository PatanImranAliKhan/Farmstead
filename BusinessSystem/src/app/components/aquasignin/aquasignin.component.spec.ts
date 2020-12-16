import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AquasigninComponent } from './aquasignin.component';

describe('AquasigninComponent', () => {
  let component: AquasigninComponent;
  let fixture: ComponentFixture<AquasigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AquasigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AquasigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
