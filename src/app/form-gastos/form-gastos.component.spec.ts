import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormGastosComponent } from './form-gastos.component';

describe('FormGastosComponent', () => {
  let component: FormGastosComponent;
  let fixture: ComponentFixture<FormGastosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGastosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
