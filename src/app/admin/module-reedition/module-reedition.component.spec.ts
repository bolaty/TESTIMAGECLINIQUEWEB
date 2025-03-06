import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleReeditionComponent } from './module-reedition.component';

describe('ModuleReeditionComponent', () => {
  let component: ModuleReeditionComponent;
  let fixture: ComponentFixture<ModuleReeditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleReeditionComponent]
    });
    fixture = TestBed.createComponent(ModuleReeditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
