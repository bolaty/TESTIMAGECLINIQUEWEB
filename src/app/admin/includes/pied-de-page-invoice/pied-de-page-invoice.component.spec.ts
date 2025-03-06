import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiedDePageInvoiceComponent } from './pied-de-page-invoice.component';

describe('PiedDePageInvoiceComponent', () => {
  let component: PiedDePageInvoiceComponent;
  let fixture: ComponentFixture<PiedDePageInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiedDePageInvoiceComponent]
    });
    fixture = TestBed.createComponent(PiedDePageInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
