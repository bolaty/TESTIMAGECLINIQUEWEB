import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTransmissionDeRapportComponent } from './module-transmission-de-rapport.component';

describe('ModuleTransmissionDeRapportComponent', () => {
  let component: ModuleTransmissionDeRapportComponent;
  let fixture: ComponentFixture<ModuleTransmissionDeRapportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleTransmissionDeRapportComponent]
    });
    fixture = TestBed.createComponent(ModuleTransmissionDeRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
