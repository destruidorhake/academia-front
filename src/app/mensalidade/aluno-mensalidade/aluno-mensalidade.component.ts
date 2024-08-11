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
import { AlunosService } from '../../Services/Alunos.Service/alunos.service';
import { Mensalidade } from '../../models/aluno.model';

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
  displayedColumns: string[] = ['nome','dataVencimento', 'valor', 'status', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(private alunosService: AlunosService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.route.paramMap.subscribe(params => {
      const alunoId = +params.get('id')!;
      this.mensalidades(alunoId);
    });
  }

  mensalidades(alunoId: number): void {
    this.alunosService.getMensalidades(alunoId).subscribe(data => {
      console.log('Dados das Mensalidades:', data); // Verifique a estrutura dos dados retornados
      this.dataSource.data = data.filter(mensalidade => mensalidade.aluno.id === alunoId);
      console.log('Dados filtrados:', this.dataSource.data); // Verifique os dados após o filtro
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

  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (filterValue) {
      this.dataSource.filter = filterValue;
      this.dataSource.filterPredicate = (data: Mensalidade, filter: string) => {
        console.log('Objeto Mensalidade:', data); // Verifique a estrutura aqui
        const searchString = filter.toLowerCase();
        return (
          data.aluno.nome.toLowerCase().includes(searchString) ||
          this.formatDate(data.dataVencimento).includes(searchString) ||
          data.valor.toString().includes(searchString) ||
          this.getStatusName(data.status).toLowerCase().includes(searchString)
        );
      };
    } else {
      this.dataSource.filter = '';
    }
  }

  // Função para atualizar o status de uma mensalidade
  aprovarPagamento(id: number): void {
    console.log(id + 'Este é o id do aluno?')
    const novoStatus = 2; // Status para confirmar o pagamento
    this.alunosService.updateStatus(id, novoStatus).subscribe(
      response => {
        console.log('Status atualizado com sucesso:', response);
        this.ngOnInit();
      },
      error => {
        console.error('Erro ao atualizar o status:', error);
      }
    );
  }
}
