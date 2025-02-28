import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface Person {
  position: number;
  name: string;
  age: number;
  gender: string;
  location: string;
}

const PERSON_DATA: Person[] = [
  { position: 1, name: 'John Doe', age: 28, gender: 'Male', location: 'USA' },
  { position: 2, name: 'Jane Smith', age: 34, gender: 'Female', location: 'Canada' },
  { position: 3, name: 'Carlos Silva', age: 45, gender: 'Male', location: 'Brazil' },
  { position: 4, name: 'Maria Garcia', age: 22, gender: 'Female', location: 'Spain' },
  { position: 5, name: 'Luca Rossi', age: 30, gender: 'Male', location: 'Italy' },
  { position: 6, name: 'Emma Brown', age: 29, gender: 'Female', location: 'Australia' },
  { position: 7, name: 'David Lee', age: 38, gender: 'Male', location: 'South Korea' },
  { position: 8, name: 'Sophia Wang', age: 25, gender: 'Female', location: 'China' },
  { position: 9, name: 'Michael Jordan', age: 42, gender: 'Male', location: 'USA' },
  { position: 10, name: 'Olivia Williams', age: 33, gender: 'Female', location: 'UK' },
];

@Component({
  selector: 'app-listagem',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent {
  displayedColumns: string[] = ['position', 'name', 'age', 'gender', 'location'];
  dataSource = new MatTableDataSource(PERSON_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
