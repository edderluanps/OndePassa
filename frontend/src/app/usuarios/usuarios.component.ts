import { ChangeDetectionStrategy, OnInit, Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, HttpClientModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toastr.success('Item excluído com sucesso!', 'Sucesso');
      } else {
        this.toastr.info('Ação cancelada!', 'Aviso');
      }
    });
  }

  usuarios: Usuario[] = [];
  usuario: Usuario | null = null;

  displayedColumns: string[] = ['position', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<Usuario>(this.usuarios);

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  carregarUsuarios(): void {
    this.usuarioService.getUsers().subscribe(
      (data) => {
        this.usuarios = data;
        this.dataSource.data = this.usuarios;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  carregarUsuarioPorId(id: number): void {
    this.usuarioService.getUserById(id).subscribe(
      (data) => {
        this.usuario = data;
      },
      (error) => {
        console.error('Erro ao carregar usuário:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewUser(id: number): void {
    this.router.navigate(['dashboard/usuario-page'])
    console.log('View user with ID:', id);
  }

  editUser(id: number): void {
    console.log('Edit user with ID:', id);
  }

  deleteUser(id: number): void {
    console.log('Delete user with ID:', id);
  }
}

@Component({
  selector: 'usuario-mat-dialog',
  templateUrl: 'usuario-delete-dialog.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsExampleDialog {}