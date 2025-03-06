import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoiDeRapportComponent } from './envoi-de-rapport.component';

describe('EnvoiDeRapportComponent', () => {
  let component: EnvoiDeRapportComponent;
  let fixture: ComponentFixture<EnvoiDeRapportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvoiDeRapportComponent]
    });
    fixture = TestBed.createComponent(EnvoiDeRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
