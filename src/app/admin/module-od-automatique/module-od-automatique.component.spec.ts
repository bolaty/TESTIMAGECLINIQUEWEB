import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleOdAutomatiqueComponent } from './module-od-automatique.component';

describe('ModuleOdAutomatiqueComponent', () => {
  let component: ModuleOdAutomatiqueComponent;
  let fixture: ComponentFixture<ModuleOdAutomatiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleOdAutomatiqueComponent]
    });
    fixture = TestBed.createComponent(ModuleOdAutomatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
