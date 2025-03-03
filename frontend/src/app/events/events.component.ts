import { Component } from '@angular/core';
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
import { ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-events',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, HttpClientModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [EventoService, DatePipe]
})
export class EventsComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
    private eventoService: EventoService
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
      },
      (error) => {
        console.error('Erro ao carregar evento:', error);
      }
    );
  }

  viewEvento(id: number): void {
    console.log('View evento with ID:', id);
  }

  editEvento(id: number): void {
    console.log('Edit evento with ID:', id);
  }

  deleteEvento(id: number): void {
    console.log('Delete evento with ID:', id);
  }

}
