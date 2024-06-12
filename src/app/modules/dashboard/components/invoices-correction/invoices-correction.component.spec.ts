import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesCorrectionComponent } from './invoices-correction.component';

describe('InvoicesCorrectionComponent', () => {
  let component: InvoicesCorrectionComponent;
  let fixture: ComponentFixture<InvoicesCorrectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesCorrectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicesCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
