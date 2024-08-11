import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Mensalidade } from '../../models/aluno.model';
import { AlunosService } from '../../Services/Alunos.Service/alunos.service';

@Component({
  selector: 'app-mensalidades-alunos-totais',
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
  templateUrl: './mensalidades-alunos-totais.component.html',
  styleUrl: './mensalidades-alunos-totais.component.css'
})
export class MensalidadesAlunosTotaisComponent {
  statusOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  dataSource = new MatTableDataSource<Mensalidade>();
  displayedColumns: string[] = ['nome', 'dataVencimento', 'valor', 'status']; // Removido 'actions'

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(private alunosService: AlunosService) { }

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
