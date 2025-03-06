import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleEditionComponent } from './module-edition.component';

describe('ModuleEditionComponent', () => {
  let component: ModuleEditionComponent;
  let fixture: ComponentFixture<ModuleEditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleEditionComponent]
    });
    fixture = TestBed.createComponent(ModuleEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
