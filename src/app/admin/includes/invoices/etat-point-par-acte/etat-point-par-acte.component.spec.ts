import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatPointParActeComponent } from './etat-point-par-acte.component';

describe('EtatPointParActeComponent', () => {
  let component: EtatPointParActeComponent;
  let fixture: ComponentFixture<EtatPointParActeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatPointParActeComponent]
    });
    fixture = TestBed.createComponent(EtatPointParActeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
