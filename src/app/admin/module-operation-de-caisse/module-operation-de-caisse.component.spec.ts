import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleOperationDeCaisseComponent } from './module-operation-de-caisse.component';

describe('ModuleOperationDeCaisseComponent', () => {
  let component: ModuleOperationDeCaisseComponent;
  let fixture: ComponentFixture<ModuleOperationDeCaisseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleOperationDeCaisseComponent]
    });
    fixture = TestBed.createComponent(ModuleOperationDeCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
