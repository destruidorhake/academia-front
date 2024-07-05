import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Mensalidade } from '../../Alunos/models/aluno.model';
import { AlunosService } from '../../Services/alunos.service';

@Component({
  selector: 'app-aluno-mensalidade',
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
  templateUrl: './aluno-mensalidade.component.html',
  styleUrl: './aluno-mensalidade.component.css'
})
export class AlunoMensalidadeComponent {

  dataSource = new MatTableDataSource<Mensalidade>();
  displayedColumns: string[] = ['nome', 'cpf', 'dataVencimento', 'valor', 'status'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(private alunosService: AlunosService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

    // Captura o ID do aluno da rota
    this.route.paramMap.subscribe(params => {
      const alunoId = +params.get('id')!;
      this.mensalidades(alunoId);
    });
  }

  mensalidades(alunoId: number): void {
    this.alunosService.getMensalidades(alunoId).subscribe(data => {
      console.log('IDs dos Alunos:', data.map(mensalidade => mensalidade.aluno.id));

      // Filtra os dados pelo ID do aluno
      this.dataSource.data = data.filter(mensalidade => mensalidade.aluno.id === alunoId);

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
