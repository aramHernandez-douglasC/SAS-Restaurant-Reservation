import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAllSeatOrdersComponent } from './dialog-all-seat-orders.component';

describe('DialogAllSeatOrdersComponent', () => {
  let component: DialogAllSeatOrdersComponent;
  let fixture: ComponentFixture<DialogAllSeatOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAllSeatOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAllSeatOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
