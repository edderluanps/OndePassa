import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listagem',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, HttpClientModule, MatIconModule, MatButtonModule],
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css'],
  providers: [UsuarioService]
})
export class ListagemComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuario: Usuario | null = null;

  displayedColumns: string[] = ['position', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<Usuario>(this.usuarios);

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.carregarUsuarios();
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
    console.log('View user with ID:', id);
  }

  editUser(id: number): void {
    console.log('Edit user with ID:', id);
  }

  deleteUser(id: number): void {
    console.log('Delete user with ID:', id);
  }
}
