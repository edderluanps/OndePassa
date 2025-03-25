import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.logOut();
      } else {
        this.toastr.info('Ação cancelada!', 'Aviso');
      }
    });
  }

  usuario?: UsuarioDTO;

  constructor(
    public storageService: StorageService,
    public toastr: ToastrService,
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
        if (error.status == 403) {
          this.router.navigate(['/login']);
          this.toastr.error("Erro ao carregar dados de usuário: " + error, "Error")
        }
      }); 
    }else{
      this.router.navigate(['/login']);
      this.toastr.error("Usuário precisa estar logado", "Error")
    }
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login'])
    this.toastr.success("Desconectado com sucesso!", "Desconectado")
  }

}

@Component({
  selector: 'perfil-mat-dialog',
  templateUrl: 'perfil-logout-dialog.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsExampleDialog {}