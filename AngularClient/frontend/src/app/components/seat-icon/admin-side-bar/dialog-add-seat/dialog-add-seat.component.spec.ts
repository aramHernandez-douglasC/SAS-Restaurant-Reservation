import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSeatComponent } from './dialog-add-seat.component';

describe('DialogAddSeatComponent', () => {
  let component: DialogAddSeatComponent;
  let fixture: ComponentFixture<DialogAddSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddSeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
