import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreMenuLinkComponent } from './parametre-menu-link.component';

describe('ParametreMenuLinkComponent', () => {
  let component: ParametreMenuLinkComponent;
  let fixture: ComponentFixture<ParametreMenuLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParametreMenuLinkComponent]
    });
    fixture = TestBed.createComponent(ParametreMenuLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
