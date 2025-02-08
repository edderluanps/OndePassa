import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListagemEventosPage } from './listagem-eventos.page';

describe('ListagemEventosPage', () => {
  let component: ListagemEventosPage;
  let fixture: ComponentFixture<ListagemEventosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
