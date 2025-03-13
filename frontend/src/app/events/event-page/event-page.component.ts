import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import moment from 'moment';

export const CUSTOM_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY HH:mm' },
  display: {
    dateInput: 'DD/MM/YYYY HH:mm',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-event-page',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, HttpClientModule, RouterModule, MatDatepickerModule],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css',
  providers: [
    EventoService,
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
})
export class EventPageComponent implements OnInit {

  formGroup!: FormGroup;
  eventoId!: number | null;
  evento!: Evento;

  constructor(
    public formBuilder: FormBuilder,
    private eventoService: EventoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
    timeA: '',
    timeB: '',
    liga: '',
    tipoEvento: '',
    dataEvento: [null]
    });

    this.route.params.subscribe(params => {
      this.eventoId = params['id'] ? +params['id'] : null;
      if (this.eventoId) {
        this.getLigaById(this.eventoId);
      }
    });
  }

  getLigaById(id: number): void {
    this.eventoService.getEventoById(id).subscribe(
      (data) => {
        if (data.dataEvento) {
          this.formGroup.patchValue({
            ...data,
            dataEvento: moment(data.dataEvento, 'YYYY-MM-DDTHH:mm:ss').toDate(), // Converter para Date
          });
        } else {
          this.formGroup.patchValue(data);
        }
      },
      (error) => {
        console.error('Erro ao carregar transmissão:', error);
      }
    );
  }
    

}
