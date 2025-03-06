import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationOperateurComponent } from './creation-operateur.component';

describe('CreationOperateurComponent', () => {
  let component: CreationOperateurComponent;
  let fixture: ComponentFixture<CreationOperateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreationOperateurComponent]
    });
    fixture = TestBed.createComponent(CreationOperateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
