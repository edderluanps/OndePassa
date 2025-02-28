import { Component } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { SideMenuComponent } from "../components/side-menu/side-menu.component";
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { DataComponent } from "./data/data.component";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, SideMenuComponent, MatSidenavModule, MatButtonModule, MatCardModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showFiller = false;
}
