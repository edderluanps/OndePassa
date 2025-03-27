import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenu, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonButtons, IonFooter, IonIcon, IonButton, IonCard, IonList, IonItem, IonLabel, IonPopover, IonAccordion, IonAccordionGroup } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic, homeOutline, footballOutline, chevronUpOutline, chevronDownOutline, calendarOutline, personOutline, notifications, chevronBackOutline, chevronForwardOutline, calendarClear } from 'ionicons/icons';

import { Router } from '@angular/router';
import { LigaService } from 'src/app/services/liga.service';
import { EventoService } from 'src/app/services/evento.service';
import { Liga } from 'src/app/models/liga';
import { Evento } from 'src/app/models/evento';
@Component({
  selector: 'app-listagem-eventos',
  templateUrl: './listagem-eventos.page.html',
  styleUrls: ['./listagem-eventos.page.scss'],
  standalone: true,
  imports: [NgFor, IonAccordionGroup, IonAccordion, IonPopover, IonLabel, IonItem, IonList, IonButton, IonIcon, IonButtons, IonMenu, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFooter]
})
export class ListagemEventosPage implements OnInit {

  currentDate: string | any;
  dropdownStates: { [key: number]: boolean } = {};

  ligas: Liga[] = [];
  liga: Liga | null = null;
  eventos: Evento[] = [];
  evento: Evento | null = null;
  eventosPorPais: { [key: string]: Evento[] } = {};

  constructor(
    public router: Router,
    private ligaService: LigaService,
    private eventoService: EventoService
  ) {
    addIcons({ notifications, calendarClear, footballOutline, homeOutline, calendarOutline, personOutline, chevronBackOutline, chevronForwardOutline, logoIonic, chevronUpOutline, chevronDownOutline });
    this.setCurrentDate();
  }

  ngOnInit() {
    this.carregarLigasPorPais();
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToListEvents() {
    this.router.navigate(['/listagem-eventos']);
  }

  setCurrentDate() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };

    this.currentDate = today.toLocaleDateString('pt-BR', options);
  }

  toggleDropdown(id: number) {
    this.dropdownStates[id] = !this.dropdownStates[id];
  }

  isDropdownOpen(id: number): boolean {
    return this.dropdownStates[id] || false;
  }

  goToEvent() {
    this.router.navigate(['/evento']);
  }

  goToScheduller() {
    this.router.navigate(['/calendario-eventos'])
  }

  goToProfile() {
    this.router.navigate(['/perfil'])
  }

  carregarLigasPorPais(): void {
    this.ligaService.getLigasPaises().subscribe(
      (data) => {
        this.ligas = data;
        this.ligas.forEach(liga => {
          this.carregarEventosPorPais(liga.local);
          console.log(data)
        });
      },
      (error) => {
        console.error('Erro ao carregar ligas:', error);
      }
    );
  }

  carregarEventosPorPais(local: string): void {
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
