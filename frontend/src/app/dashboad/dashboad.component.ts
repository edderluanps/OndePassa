import { Component } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { SideMenuComponent } from "../components/side-menu/side-menu.component";
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboad',
  imports: [HeaderComponent, SideMenuComponent, MatSidenavModule, MatButtonModule, MatCardModule],
  templateUrl: './dashboad.component.html',
  styleUrl: './dashboad.component.css'
})
export class DashboadComponent {
  showFiller = false;
}
