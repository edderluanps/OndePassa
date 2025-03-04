import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadEventComponent } from './event-page.component';

describe('ReadEventComponent', () => {
  let component: ReadEventComponent;
  let fixture: ComponentFixture<ReadEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
