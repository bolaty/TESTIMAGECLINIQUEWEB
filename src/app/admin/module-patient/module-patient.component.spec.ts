import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulePatientComponent } from './module-patient.component';

describe('ModulePatientComponent', () => {
  let component: ModulePatientComponent;
  let fixture: ComponentFixture<ModulePatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModulePatientComponent]
    });
    fixture = TestBed.createComponent(ModulePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
