import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenu, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonButtons, IonFooter, IonIcon, IonButton, IonCard, IonDatetime, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic, homeOutline, footballOutline, calendarOutline, personOutline, notifications, chevronBackOutline, chevronForwardOutline, calendarClear, camera, heart, checkmarkOutline, stopCircleOutline } from 'ionicons/icons';

import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonIcon, IonButtons, IonMenu, IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFooter]
})
export class PerfilPage implements OnInit {

  nome : string = "Fulano da silva";
  email : string = "fulanodasilva@email.com";
  userImg : string = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png";

  @ViewChild('fileInput') fileInput: any;

  constructor(public router: Router) {
    addIcons({notifications,camera,checkmarkOutline,stopCircleOutline,homeOutline,footballOutline,calendarOutline,personOutline,heart});
  }
  
  ngOnInit() {}

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userImg = e.target.result; // Update the profile image
      };
      reader.readAsDataURL(file);
    }
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToListEvents() {
    this.router.navigate(['/listagem-eventos']);
  }

  goToScheduller() {
    this.router.navigate(['/calendario-eventos']);
  }

  goToProfile() {
    this.router.navigate(['/perfil']);
  }

}
