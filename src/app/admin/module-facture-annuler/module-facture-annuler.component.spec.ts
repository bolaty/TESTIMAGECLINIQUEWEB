import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleFactureAnnulerComponent } from './module-facture-annuler.component';

describe('ModuleFactureAnnulerComponent', () => {
  let component: ModuleFactureAnnulerComponent;
  let fixture: ComponentFixture<ModuleFactureAnnulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleFactureAnnulerComponent]
    });
    fixture = TestBed.createComponent(ModuleFactureAnnulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
