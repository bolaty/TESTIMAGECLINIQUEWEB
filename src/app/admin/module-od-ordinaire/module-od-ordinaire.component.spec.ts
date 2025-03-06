import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleOdOrdinaireComponent } from './module-od-ordinaire.component';

describe('ModuleOdOrdinaireComponent', () => {
  let component: ModuleOdOrdinaireComponent;
  let fixture: ComponentFixture<ModuleOdOrdinaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleOdOrdinaireComponent]
    });
    fixture = TestBed.createComponent(ModuleOdOrdinaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
