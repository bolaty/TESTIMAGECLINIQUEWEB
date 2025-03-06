import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteteRecuComponent } from './entete-recu.component';

describe('EnteteRecuComponent', () => {
  let component: EnteteRecuComponent;
  let fixture: ComponentFixture<EnteteRecuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnteteRecuComponent]
    });
    fixture = TestBed.createComponent(EnteteRecuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
