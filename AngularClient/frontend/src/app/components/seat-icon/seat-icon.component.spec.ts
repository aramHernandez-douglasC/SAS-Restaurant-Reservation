import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatIconComponent } from './seat-icon.component';

describe('SeatIconComponent', () => {
  let component: SeatIconComponent;
  let fixture: ComponentFixture<SeatIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
