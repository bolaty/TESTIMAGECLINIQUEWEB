import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatListePatientsComponent } from './etat-liste-patients.component';

describe('EtatListePatientsComponent', () => {
  let component: EtatListePatientsComponent;
  let fixture: ComponentFixture<EtatListePatientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatListePatientsComponent]
    });
    fixture = TestBed.createComponent(EtatListePatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
