import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { EventoService } from '../../services/evento.service';
import { ToastrService } from 'ngx-toastr';
import { AccessLogService } from '../../services/access-log.service';

@Component({
  selector: 'app-data',
  imports: [MatSidenavModule, MatButtonModule, MatCardModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css',
  providers: [EventoService, AccessLogService]
})
export class DataComponent implements OnInit {
  
  allAccess  = 0;
  todayAccess  = 0;
  broadcastedEvents  = 0;
  todayEvents  = 0;

  constructor(
    private eventoService: EventoService,
    private accessLogService: AccessLogService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.carregarContagem();
  }

  carregarContagem(): void {
    this.eventoService.getContagemEventosDoDia().subscribe(response => {
      this.todayEvents = response.contagem;
    }, error => {
      this.toastr.error("Erro ao carregar valores: "+ error, "Erro");
    });

    this.eventoService.getContagemTotalEventos().subscribe(response => {
      this.broadcastedEvents = response.contagem;
    }, error => {
      this.toastr.error("Erro ao carregar valores: "+ error, "Erro");
    });

    this.accessLogService.getContagemAcessosDoDia().subscribe(response => {
      this.todayAccess = response.contagem;
    }, error => {
      this.toastr.error("Erro ao carregar valores: "+ error, "Erro");
    });

    this.accessLogService.getContagemTotalAcessos().subscribe(response => {
      this.allAccess = response.contagem;
    }, error => {
      this.toastr.error("Erro ao carregar valores: "+ error, "Erro");
    });


  }
}