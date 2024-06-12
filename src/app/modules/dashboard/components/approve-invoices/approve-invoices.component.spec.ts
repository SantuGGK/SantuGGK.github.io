import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveInvoicesComponent } from './approve-invoices.component';

describe('ApproveInvoicesComponent', () => {
  let component: ApproveInvoicesComponent;
  let fixture: ComponentFixture<ApproveInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveInvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
