import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ToastrService } from 'ngx-toastr';
import { LigaService } from '../../services/liga.service';
import { Liga } from '../../models/liga';

import { ActivatedRoute, Router, RouterModule  } from '@angular/router';

@Component({
  selector: 'app-form-league',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, NgIf, MatButtonModule, HttpClientModule, RouterModule],
  templateUrl: './form-league.component.html',
  styleUrl: './form-league.component.css',
  providers:[LigaService]
})
export class FormLeagueComponent implements OnInit {

  formGroup!: FormGroup;
  liga!: Liga;
  ligaId!: number | null;

  constructor(
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private ligaService : LigaService,
    private router: Router,
    private route : ActivatedRoute
  ){}
  
  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      local: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
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

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.toastr.error('Preencha os campos corretamente!', 'Erro');
      return;
    }

    const ligaData = this.formGroup.value;

    if (this.ligaId) {

      this.ligaService.putLiga(this.ligaId, ligaData).subscribe({
        next: () => {
          this.toastr.success('Liga atualizada com sucesso!', 'Sucesso');
          this.router.navigate(['/dashboard/leagues']);
        },
        error: (error) => {
          console.error('Erro ao atualizar liga:', error);
          this.toastr.error('Erro ao atualizar liga', 'Erro');
        }
      });
    } else {

      this.ligaService.postLiga(ligaData).subscribe({
        next: () => {
          this.toastr.success('Liga cadastrada com sucesso!', 'Sucesso');
          this.router.navigate(['/dashboard/leagues']);
        },
        error: (error) => {
          console.error('Erro ao cadastrar liga:', error);
          this.toastr.error('Erro ao cadastrar liga', 'Erro');
        }
      });
    }
  }
}