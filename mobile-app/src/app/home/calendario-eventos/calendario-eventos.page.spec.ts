import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarioEventosPage } from './calendario-eventos.page';

describe('CalendarioEventosPage', () => {
  let component: CalendarioEventosPage;
  let fixture: ComponentFixture<CalendarioEventosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
