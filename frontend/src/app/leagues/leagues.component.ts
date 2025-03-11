import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LigaService } from '../services/liga.service';
import { Liga } from '../models/liga';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leagues',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, HttpClientModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './leagues.component.html',
  styleUrl: './leagues.component.css',
  providers:[LigaService]
})
export class LeaguesComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

    readonly dialog = inject(MatDialog);
  
  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteLiga(id);
      } else {
        this.toastr.info('Ação cancelada!', 'Aviso');
      }
    });
  }

    ligas: Liga[] = [];
    liga: Liga | null = null;
  
    displayedColumns: string[] = ['position', 'nome', 'local', 'actions'];
    dataSource = new MatTableDataSource<Liga>(this.ligas);
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    constructor(
      private ligaService: LigaService,
      private toastr: ToastrService,
      private router: Router
    ) { }
  
    ngOnInit(): void { 
      this.carregarLigas();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  
    carregarLigas(): void {
      this.ligaService.getLigas().subscribe(
        (data) => {
          this.ligas = data;
          this.dataSource.data = this.ligas;
    
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        },
        (error) => {
          console.error('Erro ao carregar ligas:', error);
        }
      );
    }
    
  
    carregarLigaPorId(id: number): void {
      this.ligaService.getLigaById(id).subscribe(
        (data) => {
          this.liga = data;
        },
        (error) => {
          console.error('Erro ao carregar liga:', error);
        }
      );
    }

    addLiga(){
      this.router.navigate(['/dashboard/form-league'])
    }
  
    viewLiga(id: number): void {
      this.router.navigate(['dashboard/league-page', id]);
      console.log('View liga with ID:', id);
    }
  
    editLiga(id: number): void {
      this.router.navigate(['dashboard/form-league', id]);
    }
  
    deleteLiga(id: number): void {
      this.ligaService.deleteLiga(id).subscribe(
        () => {

          this.ligas = this.ligas.filter(liga => liga.id !== id);
          this.dataSource.data = this.ligas;
          this.toastr.success('Item excluído com sucesso!', 'Sucesso');
    
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        },
        (error) => {
          console.error('Erro ao deletar liga:', error);
          this.toastr.error('Erro ao excluir liga', 'Erro');
        }
      );
    }
}

@Component({
  selector: 'league-mat-dialog',
  templateUrl: 'league-delete-dialog.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsExampleDialog {}