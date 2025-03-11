import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Transmissao } from '../models/transmissao';
import { TransmissaoService } from '../services/transmissao.service';
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
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-broadcast',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, HttpClientModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './broadcast.component.html',
  styleUrl: './broadcast.component.css',
  providers: [TransmissaoService]
})
export class BroadcastComponent {

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
  
  transmissoes: Transmissao[] = [];
  transmissao: Transmissao | null = null;

  displayedColumns: string[] = ['position', 'transmissao', 'canal', 'localidadeTransmissao', 'linkTransmissao', 'evento', 'actions'];
  dataSource = new MatTableDataSource<Transmissao>(this.transmissoes);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private transmissaoService: TransmissaoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarTransmissoes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  carregarTransmissoes(): void {
    this.transmissaoService.getTransmissoes().subscribe(
      (data) => {
        this.transmissoes = data;
        this.dataSource.data = this.transmissoes;
      },
      (error) => {
        console.error('Erro ao carregar ligas:', error);
      }
    );
  }

  carregarTransmissaoPorId(id: number): void {
    this.transmissaoService.getTransmissaoById(id).subscribe(
      (data) => {
        this.transmissao = data;
      },
      (error) => {
        console.error('Erro ao carregar liga:', error);
      }
    );
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  showError() {
    this.toastr.error('Hello world!', 'Toastr fun!');
  }

  showWarn() {
    this.toastr.warning('Hello world!', 'Toastr fun!');
  }

  showInfo() {
    this.toastr.info('Hello world!', 'Toastr fun!');
  }

  viewTransmissao(id: number): void {
    this.router.navigate(['dashboard/broadcast-page']);
    console.log('View liga with ID:', id);
  }

  editTransmissao(id: number): void {
    this.router.navigate(['dashboard/form-broadcast']);
    console.log('Edit liga with ID:', id);
  }

  deleteTransmissao(id: number): void {
    console.log('Delete liga with ID:', id);
  }
}

@Component({
  selector: 'broadcast-mat-dialog',
  templateUrl: 'broadcast-delete-dialog.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsExampleDialog { 
  
}