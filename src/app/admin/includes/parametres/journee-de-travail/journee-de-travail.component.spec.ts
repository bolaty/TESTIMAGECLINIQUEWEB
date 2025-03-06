import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneeDeTravailComponent } from './journee-de-travail.component';

describe('JourneeDeTravailComponent', () => {
  let component: JourneeDeTravailComponent;
  let fixture: ComponentFixture<JourneeDeTravailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JourneeDeTravailComponent]
    });
    fixture = TestBed.createComponent(JourneeDeTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
