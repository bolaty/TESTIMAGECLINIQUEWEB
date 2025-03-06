import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteteInvoiceComponent } from './entete-invoice.component';

describe('EnteteInvoiceComponent', () => {
  let component: EnteteInvoiceComponent;
  let fixture: ComponentFixture<EnteteInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnteteInvoiceComponent]
    });
    fixture = TestBed.createComponent(EnteteInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
