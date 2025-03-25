import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { UsuarioDTO } from '../../models/usuario.dto';
import { StorageService } from '../../services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatBadgeModule, MatMenuModule, RouterModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  usuario?: UsuarioDTO;

  constructor(
    public storageService: StorageService,
    public tostr: ToastrService,
    private router: Router,
    public usuarioService: UsuarioService,
    public authService: AuthService
  ) { }

  @Output() toggleSidenav = new EventEmitter<void>();

  badge: number = 3;

  onMenuClick() {
    this.toggleSidenav.emit();
  }

  onNotificationClick() {
    this.badge = 0;
  }

  ngOnInit() {
    let localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      
      this.usuarioService.getByEmail(localUser.email).subscribe(response => {
        this.usuario = response
      }, error => {
        if (error.status == 403) {
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

}
