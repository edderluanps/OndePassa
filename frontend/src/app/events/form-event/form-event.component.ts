import { CommonModule } from '@angular/common'; 
import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Evento } from '../../models/evento';
import { EventoService } from '../../services/evento.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

import { LigaService } from '../../services/liga.service';
import { Liga } from '../../models/liga';

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
  selector: 'app-form-event',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, HttpClientModule, RouterModule, NgIf, MatOptionModule, MatSelectModule, MatDatepickerModule],
  templateUrl: './form-event.component.html',
  styleUrl: './form-event.component.css',
  providers: [
    EventoService,
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],})
export class FormEventComponent implements OnInit {

  compareLiga(o1: Liga, o2: Liga): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }  

  formGroup!: FormGroup;
  evento!: Evento;
  eventoId!: number | null;
  ligas: Liga[] = [];

  constructor(
    private ligaService: LigaService,
    public formBuilder: FormBuilder,
    private eventoService: EventoService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.carregarLigas();

    this.formGroup = this.formBuilder.group({
      timeA: ['', [Validators.required]],
      timeB: ['', [Validators.required]],
      liga: [null, [Validators.required]],
      tipoEvento: ['', [Validators.required]],
      dataEvento: [null]
    });
    

    this.route.params.subscribe(params => {
      this.eventoId = params['id'] ? +params['id'] : null;
      if (this.eventoId) {
        this.getEventoById(this.eventoId);
      }
    });

  }

  carregarLigas(){
    this.ligaService.getLigas().subscribe({
      next: (data) => {
        this.ligas = data;
      },
      error: (error) => {
        console.error('Erro ao carregar ligas:', error);
      }
    });
  }

  getEventoById(id: number): void {
    this.eventoService.getEventoById(id).subscribe(
      (data) => {

        this.formGroup.patchValue({
          ...data,
          liga: data.liga.id
        });
      },
      (error) => {
        console.error('Erro ao carregar o evento:', error);
      }
    );
  }

  onSubmit(): void {

    if (this.formGroup.invalid) {
      this.toastr.error('Preencha os campos corretamente!', 'Erro');
      return;
    }
  
    const eventoData = { ...this.formGroup.value };

    const ligaId = eventoData.liga;
    eventoData.liga = this.ligas.find(liga => liga.id === ligaId);
  
    if (this.eventoId) {
      this.eventoService.putEvento(this.eventoId, eventoData).subscribe({
        next: () => {
          this.toastr.success('Evento atualizado com sucesso!', 'Sucesso');
          this.router.navigate(['/dashboard/events']);
        },
        error: (error) => {
          console.error('Erro ao atualizar evento:', error);
          this.toastr.error('Erro ao atualizar evento', 'Erro');
        }
      });
    } else {
      this.eventoService.postEvento(eventoData).subscribe({
        next: () => {
          this.toastr.success('Evento cadastrado com sucesso!', 'Sucesso');
          this.router.navigate(['/dashboard/events']);
        },
        error: (error) => {
          console.error('Erro ao cadastrar evento:', error);
          this.toastr.error('Erro ao cadastrar evento', 'Erro');
        }
      });
    }
  }

}
