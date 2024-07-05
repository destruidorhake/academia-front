import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AlunosService } from '../Services/alunos.service';
import { Mensalidade } from '../Alunos/models/aluno.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-mensalidade',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatOptionModule,
    MatTableModule,
    MatOptionModule,
    MatIconModule,
    RouterModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule],
  templateUrl: './mensalidade.component.html',
  styleUrl: './mensalidade.component.css'
})
export class MensalidadeComponent {

  statusOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  dataSource = new MatTableDataSource<Mensalidade>();
  displayedColumns: string[] = ['nome', 'cpf', 'dataVencimento', 'valor', 'status'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(private alunosService: AlunosService) {
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.mensalidades();
  }

  mensalidades(): void {
    this.alunosService.getMensalidades(1 && 2 && 3 && 4)
    .subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator?.firstPage();
    });
  }

  getStatusName(statusNumber: number): string {
    switch (statusNumber) {
      case 1: return 'PENDENTE';
      case 2: return 'PAGA';
      case 3: return 'VENCIDA';
      case 4: return 'ANULADA';
      default: return '';
    }
  }

  focusInput(): void {
    this.searchInput.nativeElement.focus();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (filterValue) {
      this.dataSource.filter = filterValue;
      this.dataSource.filterPredicate = (data: Mensalidade, filter: string) => {
        const searchString = filter.toLowerCase();
        return (
          data.aluno.nome.toLowerCase().includes(searchString) ||
          data.aluno.cpf.toLowerCase().includes(searchString) ||
          data.dataVencimento.toLowerCase().includes(searchString) ||
          data.valor.toString().includes(searchString) ||
          this.getStatusName(data.status).toLowerCase().includes(searchString) // Aqui usamos getStatusName
        );
      };
    } else {
      this.dataSource.filter = '';
    }
  }

}
