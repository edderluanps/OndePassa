import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Transmissao } from '../../models/transmissao';
import { TransmissaoService } from '../../services/transmissao.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { Evento } from '../../models/evento';

@Component({
  selector: 'app-broadcast-page',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, HttpClientModule, RouterModule],
  templateUrl: './broadcast-page.component.html',
  styleUrl: './broadcast-page.component.css',
  providers: [TransmissaoService]
})
export class BroadcastPageComponent implements OnInit {

  formGroup!: FormGroup;
  transmissao!: Transmissao;
  transmissaoId!: number | null;
  evento!: Evento;

  constructor(
    public formBuilder: FormBuilder,
    private transmissaoService: TransmissaoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      transmissao: '',
      canal: '',
      canalImg: '',
      localidadeTransmissao: '',
      linkTransmissao: '',
      evento: ''
    });

    this.route.params.subscribe(params => {
      this.transmissaoId = params['id'] ? +params['id'] : null;
      if (this.transmissaoId) {
        this.getLigaById(this.transmissaoId);
      }
    });
  }

  getLigaById(id: number): void {
    this.transmissaoService.getTransmissaoById(id).subscribe(
      (data) => {
        this.formGroup.patchValue(data);
      },
      (error) => {
        console.error('Erro ao carregar transmissão:', error);
      }
    );

  }

}
