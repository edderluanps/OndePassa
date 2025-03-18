import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioDTO } from '../../models/usuario.dto';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {

  usuario?: UsuarioDTO;

  constructor(
    public storageService: StorageService,
    public tostr: ToastrService,
    private router: Router,
    public usuarioService: UsuarioService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    let localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      this.usuarioService.getByEmail(localUser.email).subscribe(response => {
        this.usuario = response
      }, error => {
        this.tostr.error("Erro ao carregar dados de usuário: " + error, "Error")
      });
    }
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login'])
    this.tostr.success("Desconectado com sucesso!", "Desconectado")
  }

}