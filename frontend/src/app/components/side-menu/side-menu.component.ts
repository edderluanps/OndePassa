import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-side-menu',
  imports: [MatMenuModule, MatButtonModule, MatToolbarModule, CdkAccordionModule, MatIconModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
  animations: [
    trigger('accordionBody', [
      state('collapsed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class SideMenuComponent {
  expandedItems = {
    dashboard: false,
    cadastros: false,
    acessos: false
  };

  toggleItem(item: keyof typeof this.expandedItems) {
    this.expandedItems[item] = !this.expandedItems[item];
  }
}
