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
import { Transmissao } from '../../models/transmissao';
import { TransmissaoService } from '../../services/transmissao.service';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Evento } from '../../models/evento';
import { EventoService } from '../../services/evento.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-broadcast',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, HttpClientModule, RouterModule, NgIf, NgFor, MatOptionModule, MatSelectModule ],
  templateUrl: './form-broadcast.component.html',
  styleUrl: './form-broadcast.component.css',
  providers: [TransmissaoService]

})
export class FormBroadcastComponent implements OnInit {

  formGroup!: FormGroup;
  transmissao!: Transmissao;
  transmissaoId!: number | null;
  eventos: Evento[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private transmissaoService: TransmissaoService,
    private eventoService: EventoService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      transmissao: ['', [Validators.required]],
      canal: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      canalImg: ['', [Validators.required, Validators.minLength(5)]],
      localidadeTransmissao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      linkTransmissao: ['', [Validators.required, Validators.minLength(5)]],
      evento: [null, [Validators.required]]
    });

    this.loadEventos();

    this.route.params.subscribe(params => {
      this.transmissaoId = params['id'] ? +params['id'] : null;
      if (this.transmissaoId) {
        this.getTransmissaoById(this.transmissaoId);
      }
    });
  }

  loadEventos(): void {
    this.eventoService.getEventos().subscribe(
      (eventos) => {
        this.eventos = eventos;
      },
      (error) => {
        console.error('Erro ao carregar eventos:', error);
      }
    );
  }

  getTransmissaoById(id: number): void {
    this.transmissaoService.getTransmissaoById(id).subscribe(
      (data) => {
        this.formGroup.patchValue({
          ...data,
          evento: data.evento ? data.evento.id : null
        });
      },
      (error) => {
        console.error('Erro ao carregar transmissão:', error);
      }
    );

  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.toastr.error('Preencha os campos corretamente!', 'Erro');
      return;
    }

    const transmissaoData = this.formGroup.value;

    if (transmissaoData.evento) {
      transmissaoData.evento = { id: transmissaoData.evento };
    }

    if (this.transmissaoId) {

      this.transmissaoService.putTransmissao(this.transmissaoId, transmissaoData).subscribe({
        next: () => {
          this.toastr.success('Transmissão atualizada com sucesso!', 'Sucesso');
          this.router.navigate(['/dashboard/broadcast']);
        },
        error: (error) => {
          console.error('Erro ao atualizar transmissão:', error);
          this.toastr.error('Erro ao atualizar transmissão', 'Erro');
        }
      });
    } else {

      this.transmissaoService.postTransmissao(transmissaoData).subscribe({
        next: () => {
          this.toastr.success('Transmissão cadastrada com sucesso!', 'Sucesso');
          this.router.navigate(['/dashboard/broadcast']);
        },
        error: (error) => {
          console.error('Erro ao cadastrar transmissão:', error);
          this.toastr.error('Erro ao cadastrar transmissão', 'Erro');
        }
      });
    }
  }
}