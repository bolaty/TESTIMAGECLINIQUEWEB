import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleGuichetVersementComponent } from './module-guichet-versement.component';

describe('ModuleGuichetVersementComponent', () => {
  let component: ModuleGuichetVersementComponent;
  let fixture: ComponentFixture<ModuleGuichetVersementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleGuichetVersementComponent]
    });
    fixture = TestBed.createComponent(ModuleGuichetVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
