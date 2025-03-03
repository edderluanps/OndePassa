import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LigaService } from '../services/liga.service';
import { Liga } from '../models/liga';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-leagues',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, HttpClientModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './leagues.component.html',
  styleUrl: './leagues.component.css',
  providers:[LigaService]
})
export class LeaguesComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

    ligas: Liga[] = [];
    liga: Liga | null = null;
  
    displayedColumns: string[] = ['position', 'nome', 'local', 'actions'];
    dataSource = new MatTableDataSource<Liga>(this.ligas);
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    constructor( private ligaService: LigaService ) { }
  
    ngOnInit(): void { 
      this.carregarLigas();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  
    carregarLigas(): void {
      this.ligaService.getLigas().subscribe(
        (data) => {
          this.ligas = data;
          this.dataSource.data = this.ligas;
        },
        (error) => {
          console.error('Erro ao carregar ligas:', error);
        }
      );
    }
  
    carregarLigaPorId(id: number): void {
      this.ligaService.getLigaById(id).subscribe(
        (data) => {
          this.liga = data;
        },
        (error) => {
          console.error('Erro ao carregar liga:', error);
        }
      );
    }
  
    viewLiga(id: number): void {
      console.log('View liga with ID:', id);
    }
  
    editLiga(id: number): void {
      console.log('Edit liga with ID:', id);
    }
  
    deleteLiga(id: number): void {
      console.log('Delete liga with ID:', id);
    }
}
