import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatListePaiementsComponent } from './etat-liste-paiements.component';

describe('EtatListePaiementsComponent', () => {
  let component: EtatListePaiementsComponent;
  let fixture: ComponentFixture<EtatListePaiementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatListePaiementsComponent]
    });
    fixture = TestBed.createComponent(EtatListePaiementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
