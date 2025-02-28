import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface SportsEvent {
  position: number;
  name: string;
  type: string;      // Type of sport event (e.g., Football, Basketball, etc.)
  location: string;  // Location of the event (e.g., city or country)
  broadcast: string; // Broadcast channel for the event
}

const EVENT_DATA: SportsEvent[] = [
  { position: 1, name: 'FIFA World Cup', type: 'Football', location: 'Qatar', broadcast: 'TNT Sports Brasil' },
  { position: 2, name: 'Olympic Games', type: 'Multi-Sport', location: 'Paris', broadcast: 'NBC Sports' },
  { position: 3, name: 'NBA Finals', type: 'Basketball', location: 'USA', broadcast: 'ESPN' },
  { position: 4, name: 'Super Bowl', type: 'American Football', location: 'USA', broadcast: 'FOX Sports' },
  { position: 5, name: 'Wimbledon', type: 'Tennis', location: 'London', broadcast: 'BBC Sport' },
  { position: 6, name: 'Tour de France', type: 'Cycling', location: 'France', broadcast: 'Eurosport' },
  { position: 7, name: 'UFC Championship', type: 'MMA', location: 'Las Vegas', broadcast: 'ESPN+' },
  { position: 8, name: 'Formula 1 Grand Prix', type: 'Motorsport', location: 'Monaco', broadcast: 'Sky Sports' },
  { position: 9, name: 'Champions League Final', type: 'Football', location: 'Istanbul', broadcast: 'TNT Sports Brasil' },
  { position: 10, name: 'The Masters', type: 'Golf', location: 'Augusta', broadcast: 'CBS Sports' },
];

@Component({
  selector: 'app-events',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  displayedColumns: string[] = ['position', 'name', 'type', 'location', 'broadcast'];
  dataSource = new MatTableDataSource(EVENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
