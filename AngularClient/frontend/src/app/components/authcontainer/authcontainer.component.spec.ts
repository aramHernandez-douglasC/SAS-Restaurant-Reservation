import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthcontainerComponent } from './authcontainer.component';

describe('AuthcontainerComponent', () => {
  let component: AuthcontainerComponent;
  let fixture: ComponentFixture<AuthcontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthcontainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
