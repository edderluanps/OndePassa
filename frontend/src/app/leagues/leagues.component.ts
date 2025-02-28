import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface PeriodicElement {
  nome: string;
  id: number;
  modalidade: string;
  local: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, nome: 'Champions League', modalidade: 'Football', local: 'Europe'},
  {id: 2, nome: 'Premier League', modalidade: 'Football', local: 'England'},
  {id: 3, nome: 'La Liga', modalidade: 'Football', local: 'Spain'},
  {id: 4, nome: 'Serie A', modalidade: 'Football', local: 'Italy'},
  {id: 5, nome: 'Bundesliga', modalidade: 'Football', local: 'Germany'},
  {id: 6, nome: 'Major League Soccer', modalidade: 'Football', local: 'USA'},
  {id: 7, nome: 'NBA', modalidade: 'Basketball', local: 'USA'},
  {id: 8, nome: 'NHL', modalidade: 'Ice Hockey', local: 'North America'},
  {id: 9, nome: 'Formula 1', modalidade: 'Motorsport', local: 'Worldwide'},
  {id: 10, nome: 'UFC', modalidade: 'MMA', local: 'Worldwide'},
];

@Component({
  selector: 'app-leagues',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './leagues.component.html',
  styleUrl: './leagues.component.css'
})
export class LeaguesComponent {
displayedColumns: string[] = ['id', 'nome', 'modalidade', 'local'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
