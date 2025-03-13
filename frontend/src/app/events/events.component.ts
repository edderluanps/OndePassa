import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Evento } from '../models/evento';
import { EventoService } from '../services/evento.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
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
  selector: 'app-events',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, HttpClientModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [EventoService, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly dialog = inject(MatDialog);

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteEvento(id);
      } else {
        this.toastr.info('Ação cancelada!', 'Aviso');
      }
    });
  }

  eventos: Evento[] = [];
  evento: Evento | null = null;

  displayedColumns: string[] = ['position', 'timeA', 'timeB', 'liga', 'tipoEvento', 'dataEvento', 'actions'];
  dataSource = new MatTableDataSource<Evento>(this.eventos);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private datePipe: DatePipe,
    private eventoService: EventoService,
    private toastr: ToastrService,
    private router: Router
    
  ) { }

  formatDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'dd/MM/yyyy, HH:mm');
  }

  ngOnInit(): void { 
    this.carregarEventos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  carregarEventos(): void {
    this.eventoService.getEventos().subscribe(
      (data) => {
        this.eventos = data;
        this.dataSource.data = this.eventos;
      },
      (error) => {
        console.error('Erro ao carregar eventos:', error);
      }
    );
  }

  carregarEventoPorId(id: number): void {
    this.eventoService.getEventoById(id).subscribe(
      (data) => {
        this.evento = data;
        console.log(data)
      },
      (error) => {
        console.error('Erro ao carregar evento:', error);
      }
    );
  }

  addEvento(){
    this.router.navigate(['dashboard/form-event']);
  }

  viewEvento(id: number): void {
    this.router.navigate(['dashboard/event-page', id]);
  }

  editEvento(id: number): void {
    this.router.navigate(['dashboard/form-event', id]);
  }

  deleteEvento(id: number): void {
    this.eventoService.deleteEvento(id).subscribe(
      () => {

        this.eventos = this.eventos.filter(evento => evento.id !== id);
        this.dataSource.data = this.eventos;
        this.toastr.success('Item excluído com sucesso!', 'Sucesso');
  
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },
      (error) => {
        console.error('Erro ao deletar evento:', error);
        this.toastr.error('Erro ao excluir evento', 'Erro');
      }
    );
  }

}

@Component({
  selector: 'event-mat-dialog',
  templateUrl: 'event-delete-dialog.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsExampleDialog {}