import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listagem-eventos-horarios',
  imports: [MatMenuModule, MatButtonModule, MatToolbarModule, CdkAccordionModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './listagem-eventos-horarios.component.html',
  styleUrl: './listagem-eventos-horarios.component.css'
})
export class ListagemEventosHorariosComponent {
  paisesComPartidas = [
    {
      nome: 'Inglaterra',
      partidas: ['Premier League: Aston Villa x Nottingham Forest', 'FA Cup: Chelsea x Liverpool']
    },
    {
      nome: 'Espanha',
      partidas: ['La Liga: Real Madrid x Barcelona', 'Copa del Rey: Sevilla x Atletico Madrid']
    },
    {
      nome: 'Itália',
      partidas: ['Serie A: Milan x Inter', 'Copa Itália: Juventus x Napoli']
    },
    {
      nome: 'Brasil',
      partidas: ['Brasileirão: Flamengo x Palmeiras', 'Copa do Brasil: Corinthians x Grêmio']
    }
  ];
}
