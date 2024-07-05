import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AlunosService } from '../../Services/alunos.service';
import { Aluno, AlunosResponse } from '../models/aluno.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-alunos-ativos',
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
    NgxMaskPipe
  ],
  templateUrl: './alunos-ativos.component.html',
  styleUrl: './alunos-ativos.component.css'
})
export class AlunosAtivosComponent {

  @ViewChild('searchInput') searchInput!: ElementRef;

  displayedColumns: string[] = ['nome', 'cpf', 'telefone', 'endereco', 'dataCriacao'];
  dataSource = new MatTableDataSource<Aluno>();

  constructor(private alunosService: AlunosService) {}

  ngOnInit() {
    this.alunosService.getAlunos().subscribe((response: AlunosResponse) => {
      const alunosAtivos = response.content.filter(aluno => aluno.ativo === 'S');
      this.dataSource.data = alunosAtivos;
    });
  }

  focusInput() {
    this.searchInput.nativeElement.focus();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
