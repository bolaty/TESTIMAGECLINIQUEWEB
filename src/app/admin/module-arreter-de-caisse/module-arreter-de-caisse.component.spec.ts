import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleArreterDeCaisseComponent } from './module-arreter-de-caisse.component';

describe('ModuleArreterDeCaisseComponent', () => {
  let component: ModuleArreterDeCaisseComponent;
  let fixture: ComponentFixture<ModuleArreterDeCaisseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleArreterDeCaisseComponent]
    });
    fixture = TestBed.createComponent(ModuleArreterDeCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
