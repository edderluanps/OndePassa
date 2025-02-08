import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,AlertController, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonInput, IonInputPasswordToggle} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [ IonInput, IonInputPasswordToggle, IonButton, CommonModule, FormsModule]
})
export class SignupPage implements OnInit {

  constructor(
    public router : Router,
    private alertController: AlertController
  ) {}

    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Seja bem vind@',
        subHeader: 'Bem vind@',
        message: '',
        buttons: ['Fechar'],
      });

      await alert.present();
    }
  
    goToProfile(){
      this.router.navigate(['/perfil']);
      this.presentAlert();
    }
  
    goToHome(){
      this.router.navigate(['/']);
    }

  ngOnInit() {
  }

}
