import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenu, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonButtons, IonFooter, IonIcon, IonButton, IonCard, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic, homeOutline, footballOutline, chevronUpOutline, chevronDownOutline, calendarOutline, personOutline, notifications, chevronBackOutline, chevronForwardOutline, calendarClear } from 'ionicons/icons';

import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-eventos',
  templateUrl: './listagem-eventos.page.html',
  styleUrls: ['./listagem-eventos.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonButton, IonIcon, IonButtons, IonMenu, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFooter]
})
export class ListagemEventosPage implements OnInit {
  
  currentDate: string | any;
  dropdownStates: { [key: number]: boolean } = {};

    constructor(public router : Router) {
      addIcons({notifications,calendarClear,footballOutline,homeOutline,calendarOutline,personOutline,chevronBackOutline,chevronForwardOutline,logoIonic,chevronUpOutline,chevronDownOutline});
      this.setCurrentDate();
    }

  ngOnInit() {
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  goToListEvents(){
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

  goToEvent(){
    this.router.navigate(['/evento']);
  }

  goToScheduller(){
    this.router.navigate(['/calendario-eventos'])
  }

  goToProfile(){
    this.router.navigate(['/perfil'])
  }

}
