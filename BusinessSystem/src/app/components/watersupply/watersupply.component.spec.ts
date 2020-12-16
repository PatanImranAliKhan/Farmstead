import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatersupplyComponent } from './watersupply.component';

describe('WatersupplyComponent', () => {
  let component: WatersupplyComponent;
  let fixture: ComponentFixture<WatersupplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatersupplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatersupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
