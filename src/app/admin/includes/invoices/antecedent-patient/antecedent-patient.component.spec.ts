import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentPatientComponent } from './antecedent-patient.component';

describe('AntecedentPatientComponent', () => {
  let component: AntecedentPatientComponent;
  let fixture: ComponentFixture<AntecedentPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AntecedentPatientComponent]
    });
    fixture = TestBed.createComponent(AntecedentPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
