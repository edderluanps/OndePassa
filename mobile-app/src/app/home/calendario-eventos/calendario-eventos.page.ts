import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenu, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonButtons, IonFooter, IonIcon, IonButton, IonCard, IonDatetime, IonPopover, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic, homeOutline, footballOutline, calendarOutline, personOutline, notifications, chevronBackOutline, chevronForwardOutline, calendarClear } from 'ionicons/icons';

import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario-eventos',
  templateUrl: './calendario-eventos.page.html',
  styleUrls: ['./calendario-eventos.page.scss'],
  standalone: true,
  imports: [IonItem, IonPopover, IonDatetime, IonButton, IonIcon, IonButtons, IonMenu, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFooter]
})
export class CalendarioEventosPage implements OnInit {

  selectedDate: string = new Date().toISOString();

  constructor(public router : Router) {
    addIcons({notifications,calendarClear,homeOutline,footballOutline,calendarOutline,personOutline,chevronBackOutline,chevronForwardOutline,logoIonic});
  }

  ngOnInit() {
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  goToListEvents(){
    this.router.navigate(['/listagem-eventos']);
  }

  goToScheduller(){
    this.router.navigate(['/calendario-eventos'])
  }

  goToProfile(){
    this.router.navigate(['/perfil'])
  }

  onDateChange(event: any) {
    const selectedDate = new Date(event.detail.value);
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    console.log(`${day}/${month}/${year}`)
    this.goToListEvents();
  }
  
}
