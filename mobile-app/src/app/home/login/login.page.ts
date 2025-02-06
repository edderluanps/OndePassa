import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,AlertController, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonInput, IonInputPasswordToggle} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ IonInput, IonInputPasswordToggle, IonButton, IonContent, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

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
  
    goToDashboard(){
      this.router.navigate(['/dashboard']);
      this.presentAlert();
    }
  
    goToSignup(){
      this.router.navigate(['/home']);
    }

  ngOnInit() {
  }

}
