import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Liga } from '../../models/liga';
import { LigaService } from '../../services/liga.service';
import { HttpClientModule } from '@angular/common/http';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';

@Component({
  selector: 'app-listagem-eventos-horarios',
  imports: [MatMenuModule, MatButtonModule, MatToolbarModule, CdkAccordionModule, MatIconModule, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './listagem-eventos-horarios.component.html',
  styleUrl: './listagem-eventos-horarios.component.css',
  providers: [LigaService, EventoService]
})
export class ListagemEventosHorariosComponent {

  ligas: Liga[] = [];
  liga: Liga | null = null;
  eventos: Evento[] = [];
  evento: Evento | null = null;
  eventosPorPais: { [key: string]: Evento[] } = {};
  
  constructor(
    private ligaService: LigaService,
    private eventoService: EventoService
  ) { }

  ngOnInit(): void {
    this.carregarLigasPorPais();
  }

  carregarLigasPorPais(): void {
    this.ligaService.getLigasPaises().subscribe(
      (data) => {
        this.ligas = data;
        this.ligas.forEach(liga => {
          this.carregarEventosPorPais(liga.local);
        });
      },
      (error) => {
        console.error('Erro ao carregar ligas:', error);
      }
    );
  }

  carregarEventosPorPais(local: string): void{
    this.eventoService.getEventoByLocal(local).subscribe(
      (data) => {
        this.eventosPorPais[local] = data;
      },
      (error) => {
        console.error('Erro ao carregar eventos:', error);
      }
    );
  }
}
