import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

interface Esporte {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private router: Router){}

  hide = signal(true);

  foods: Esporte[] = [
    {value: 'futebol', viewValue: 'Futebol'},
    {value: 'volley', viewValue: 'Volley'},
    {value: 'basquete', viewValue: 'Basquete'},
  ];
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  goToDashboard(){
    this.router.navigate(["/dashboard"]);
  }

  goToLogin(){
    this.router.navigate(["/login"]);
  }
}
