import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrouillardCaisseComponent } from './brouillard-caisse.component';

describe('BrouillardCaisseComponent', () => {
  let component: BrouillardCaisseComponent;
  let fixture: ComponentFixture<BrouillardCaisseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrouillardCaisseComponent]
    });
    fixture = TestBed.createComponent(BrouillardCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
