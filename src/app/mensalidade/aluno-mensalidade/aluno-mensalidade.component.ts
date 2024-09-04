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
import { MensalidadeDTO } from '../../models/alunos.model';
import { BrowserModule } from '@angular/platform-browser';

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
  dataSource = new MatTableDataSource<MensalidadeDTO>();
  displayedColumns: string[] = ['nome', 'dataVencimento', 'valor', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(private alunosService: AlunosService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const alunoId = +params.get('id')!;
      this.mensalidades(alunoId);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  mensalidades(alunoId: number): void {
    this.alunosService.getMensalidades(alunoId).subscribe(data => {
      console.log('Dados recebidos:', data);

      // Filtra os dados para garantir que só exiba as mensalidades do aluno especificado
      this.dataSource.data = data.filter(mensalidade => mensalidade.aluno.id === alunoId);
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
    this.dataSource.filterPredicate = (data: MensalidadeDTO, filter: string) => {
      const searchString = filter.toLowerCase();
      return (
        data.aluno.nome.toLowerCase().includes(searchString) ||
        this.formatDate(data.dataVencimento).includes(searchString) ||
        data.valor.toString().includes(searchString) ||
        this.getStatusName(data.status).toLowerCase().includes(searchString)
      );
    };
    this.dataSource.filter = filterValue;
  }

  aprovarPagamento(mensalidadeId: number): void {
    const novoStatus = 2; // Status para confirmar o pagamento
    console.log(mensalidadeId);

    if (mensalidadeId) {
      this.alunosService.updateStatus(mensalidadeId, novoStatus).subscribe(
        response => {
          this.mensalidades(+this.route.snapshot.paramMap.get('id')!); // Atualiza a lista de mensalidades
        },
        error => {
          console.error('Erro ao aprovar pagamento:', error);
        }
      );
    }
  }
}
