import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleExtourneOperationComponent } from './module-extourne-operation.component';

describe('ModuleExtourneOperationComponent', () => {
  let component: ModuleExtourneOperationComponent;
  let fixture: ComponentFixture<ModuleExtourneOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleExtourneOperationComponent]
    });
    fixture = TestBed.createComponent(ModuleExtourneOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
