import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemEventosHorariosComponent } from './listagem-eventos-horarios.component';

describe('ListagemEventosHorariosComponent', () => {
  let component: ListagemEventosHorariosComponent;
  let fixture: ComponentFixture<ListagemEventosHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemEventosHorariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemEventosHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
