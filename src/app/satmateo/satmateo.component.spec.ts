import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatmateoComponent } from './satmateo.component';

describe('SatmateoComponent', () => {
  let component: SatmateoComponent;
  let fixture: ComponentFixture<SatmateoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatmateoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatmateoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
