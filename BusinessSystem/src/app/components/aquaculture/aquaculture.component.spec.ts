import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AquacultureComponent } from './aquaculture.component';

describe('AquacultureComponent', () => {
  let component: AquacultureComponent;
  let fixture: ComponentFixture<AquacultureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AquacultureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AquacultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
