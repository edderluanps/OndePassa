import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonButton],
})
export class HomePage {
  constructor(public router : Router) {}

  goToLogin(){
    this.router.navigate(['/login']);
  }

  goToSignup(){
    this.router.navigate(['/signup']);
  }
}
