import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationProfilComponent } from './creation-profil.component';

describe('CreationProfilComponent', () => {
  let component: CreationProfilComponent;
  let fixture: ComponentFixture<CreationProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreationProfilComponent]
    });
    fixture = TestBed.createComponent(CreationProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
