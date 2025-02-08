import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenu, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonButtons, IonFooter, IonIcon, IonButton, IonModal, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic, homeOutline, footballOutline, calendarOutline, personOutline, notifications, chevronBackOutline, chevronForwardOutline, personCircle } from 'ionicons/icons';
import { register } from 'swiper/element/bundle';
register();

import { Router } from '@angular/router';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
  standalone: true,
  imports: [IonModal, IonButton, IonIcon, IonButtons, IonMenu, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFooter]
})
export class EventoPage implements OnInit {

  evento : string | undefined;
  time1 : string = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/800px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png";
  time2 : string = "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/874.png";

  @ViewChild('modal', { static: false }) modal!: IonModal;
  selectedPlatform: string = '';

  constructor(private router : Router) {
      addIcons({notifications,personCircle,homeOutline,footballOutline,calendarOutline,personOutline}); }

  ngOnInit() {
    this.evento = 'São Paulo x Corinthians';
    addIcons({notifications,chevronBackOutline,chevronForwardOutline,homeOutline,footballOutline,calendarOutline,personOutline,logoIonic});
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  goToListEvents(){
    this.router.navigate(['/listagem-eventos']);
  }

  goToSignup(){
    this.router.navigate(['/signup'])
  }

  goToProfile(){
    this.router.navigate(['/perfil'])
  }

  openModal(platform: string) {
    this.selectedPlatform = platform;
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss();
  }

}
