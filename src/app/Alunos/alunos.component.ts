import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AlunosService } from '../Services/alunos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Aluno, AlunosResponse } from './models/aluno.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

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
    NgxMaskDirective,
    NgxMaskPipe],
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  alunos: any[] = [];

  @ViewChild('searchInput') searchInput!: ElementRef;

  dataSource = new MatTableDataSource<Aluno>();
  displayedColumns: string[] = ['nome', 'cpf', 'telefone', 'endereco', 'actions'];

  constructor(private alunosService: AlunosService, private router: Router) { }

  ngOnInit(): void {
    this.carregarAlunos();
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

  focusInput() {
    this.searchInput.nativeElement.focus();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateToAtualizar(id: number) {
    this.router.navigate(['/atualizar', id]);
  }

  navigateToMensalidade(id: number) {
    this.router.navigate(['/aluno/mensalidade', id]);
  }

  verMensalidades(id: number) {
    this.router.navigate(['/mensalidade', id]);
  }

  desativaAluno(id: number) {
    console.log(`Iniciando exclusão do aluno com ID: ${id}`);
    this.alunosService.desativarAluno(id).subscribe(
      () => {
        this.carregarAlunos();
      },
      (error) => {
        console.error(`Erro ao deletar aluno com ID ${id}:`, error);
      }
    );
  }

  ativarAluno(id: number) {
    console.log(`Ativando aluno com ID: ${id}`);
    this.alunosService.reativarAluno(id).subscribe(
      () => {
        this.carregarAlunos();
      },
      (error) => {
        console.error(`Erro ao ativar aluno com ID ${id}:`, error);
      }
    );
  }
}
