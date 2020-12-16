import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrisigninComponent } from './agrisignin.component';

describe('AgrisigninComponent', () => {
  let component: AgrisigninComponent;
  let fixture: ComponentFixture<AgrisigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrisigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrisigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
