import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBroadcastComponent } from './form-broadcast.component';

describe('FormBroadcastComponent', () => {
  let component: FormBroadcastComponent;
  let fixture: ComponentFixture<FormBroadcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBroadcastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
