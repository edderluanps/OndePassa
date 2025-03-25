import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { CredenciaisDTO } from './credenciais.dto';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService, StorageService],
})
export class LoginComponent {

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  credenciais: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  hide = signal(true);
  ngOnInit(): void {
  }

  login() {
    this.authService.authenticate(this.credenciais).subscribe(
      response => {
      this.authService.successfulLogin(response.headers.get('Authorization') || '');
      this.toastr.success("Login efetuado com sucesso!", "login autorizado")
      this.router.navigate(['/dashboard']);
    }, error => {
      this.toastr.error("Erro ao logar: " + error, "Erro ao logar")
    })
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  goToDashboard() {
    this.router.navigate(["/dashboard"]);
  }

  goToSignup() {
    this.router.navigate(["/signup"]);
  }

}