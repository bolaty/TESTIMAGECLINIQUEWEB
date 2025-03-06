import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueFactureComponent } from './historique-facture.component';

describe('HistoriqueFactureComponent', () => {
  let component: HistoriqueFactureComponent;
  let fixture: ComponentFixture<HistoriqueFactureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueFactureComponent]
    });
    fixture = TestBed.createComponent(HistoriqueFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
