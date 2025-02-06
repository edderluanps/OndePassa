import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenu, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonButtons, IonFooter, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic, homeOutline, footballOutline, calendarOutline, personOutline, notificationsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonButtons, IonMenu, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFooter]
})
export class DashboardPage implements OnInit {

  constructor() {
    addIcons({notificationsOutline,homeOutline,footballOutline,calendarOutline,personOutline,logoIonic});
  }

  ngOnInit() {
  }

}
