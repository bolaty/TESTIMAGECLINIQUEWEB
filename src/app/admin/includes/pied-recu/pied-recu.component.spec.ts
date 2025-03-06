import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiedRecuComponent } from './pied-recu.component';

describe('PiedRecuComponent', () => {
  let component: PiedRecuComponent;
  let fixture: ComponentFixture<PiedRecuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiedRecuComponent]
    });
    fixture = TestBed.createComponent(PiedRecuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
