import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Liga } from '../../models/liga';
import { LigaService } from '../../services/liga.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-league-page',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, HttpClientModule, RouterModule],
  templateUrl: './league-page.component.html',
  styleUrl: './league-page.component.css',
  providers: [LigaService]
})
export class LeaguePageComponent implements OnInit{

  formGroup!: FormGroup;
  liga!: Liga;
  ligaId!: number | null;

  constructor(
    public formBuilder: FormBuilder,
    private ligaService: LigaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      nome: '',
      local: ''
    });

    this.route.params.subscribe(params => {
      this.ligaId = params['id'] ? +params['id'] : null;
      if (this.ligaId) {
        this.getLigaById(this.ligaId);
      }
    });
  }

  getLigaById(id: number): void {
    this.ligaService.getLigaById(id).subscribe(
      (data) => {
        this.formGroup.patchValue(data);
      },
      (error) => {
        console.error('Erro ao carregar liga:', error);
      }
    );
  }

}