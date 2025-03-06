import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleCreationPatientComponent } from './module-creation-patient.component';

describe('ModuleCreationPatientComponent', () => {
  let component: ModuleCreationPatientComponent;
  let fixture: ComponentFixture<ModuleCreationPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleCreationPatientComponent]
    });
    fixture = TestBed.createComponent(ModuleCreationPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
