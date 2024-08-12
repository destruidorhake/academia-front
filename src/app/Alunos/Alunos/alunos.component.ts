import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule  } from '@angular/material/dialog';
import { Aluno, AlunosResponse } from '../../models/aluno.model';
import { AlunosService } from '../../Services/Alunos.Service/alunos.service';
import { DialogService } from '../../Services/Dialog.Service/dialog.service';

@Component({
  selector: 'app-alunos',
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
    MatDialogModule],
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  alunos: any[] = [];
  isDialogOpen = false;

  @ViewChild('searchInput') searchInput!: ElementRef;

  dataSource = new MatTableDataSource<Aluno>();
  displayedColumns: string[] = ['nome', 'endereco', 'nascimento', 'telefone', 'criacao', 'actions'];

  constructor(
    private dialogService: DialogService,
    private alunosService: AlunosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarAlunos();
  }

  focusInput() {
    this.searchInput.nativeElement.focus();
  }

  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Aluno, filter: string) => {
      const dataStr =
      `${data.nome}
       ${data.endereco.cep}
       ${data.endereco.logradouro}
       ${data.endereco.bairro}
       ${data.endereco.estado}
       ${data.telefone}
       ${this.formatDate(data.dataNascimento)}
       ${this.formatDate(data.dataCriacao)}`.toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
    this.dataSource.filter = filterValue;
  }

  navigateToAtualizar(id: number) {
    this.router.navigate(['/search/atualizar', id]);
  }

  navigateToMensalidade(id: number) {
    this.router.navigate(['/search/mensalidade', id]);
  }

  carregarAlunos() {
    this.alunosService.getAlunos().subscribe(
      (data: AlunosResponse) => {
        this.dataSource.data = data.content;
      },
      (error) => {
        console.error('Erro ao carregar alunos:', error);
      }
    );
  }

  ativarAluno(id: number) {
    this.alunosService.reativarAluno(id).subscribe(
      () => {
        this.carregarAlunos();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  desativaAluno(id: number) {
    this.alunosService.desativarAluno(id).subscribe(
      () => {
        this.carregarAlunos();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openDialog(alunoId: number): void {
    if (this.isDialogOpen) {
      return;
    }

    this.isDialogOpen = true;
    const dialogRef = this.dialogService.openConfirmDialog(alunoId);

    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;

      if (result) {
        this.desativaAluno(alunoId);
      }
    });
    dialogRef.componentInstance?.resetButtonFocus();
  }

  // FORMATADOR DE TELEFONE
  formatTelefone(telefone: string): string {
    // Remove caracteres inválidos como parênteses extras, espaços e traços
    let telefoneLimpo = telefone.replace(/[^\d]/g, '');

    // Se o telefone não tiver o código de país, adiciona o +55
    if (!telefoneLimpo.startsWith('55')) {
      telefoneLimpo = `55${telefoneLimpo}`;
    }

    // Remove o código de país para tratar apenas o DDD e o número
    const codigoPais = telefoneLimpo.slice(0, 2);
    const ddd = telefoneLimpo.slice(2, 4);
    const numeroParte1 = telefoneLimpo.slice(4, 9);
    const numeroParte2 = telefoneLimpo.slice(9);

    // Formata o número com o padrão brasileiro +55 (DD) 00000-0000
    return `+${codigoPais} (${ddd}) ${numeroParte1}-${numeroParte2}`;
  }
}

