import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatFormationComponent } from './etat-formation.component';

describe('EtatFormationComponent', () => {
  let component: EtatFormationComponent;
  let fixture: ComponentFixture<EtatFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatFormationComponent]
    });
    fixture = TestBed.createComponent(EtatFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
