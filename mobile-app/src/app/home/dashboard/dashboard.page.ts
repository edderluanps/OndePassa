import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenu, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonButtons, IonFooter, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic, homeOutline, footballOutline, calendarOutline, personOutline, notifications, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { register } from 'swiper/element/bundle';
register();

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonButton, IonIcon, IonButtons, IonMenu, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFooter]
})
export class DashboardPage implements OnInit {

  constructor(public router : Router) {
    addIcons({notifications,chevronBackOutline,chevronForwardOutline,homeOutline,footballOutline,calendarOutline,personOutline,logoIonic});
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

}
