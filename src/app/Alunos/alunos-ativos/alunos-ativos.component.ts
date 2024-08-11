import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';;
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { Aluno, AlunosResponse } from '../../models/aluno.model';
import { AlunosService } from '../../Services/Alunos.Service/alunos.service';

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
  ],
  templateUrl: './alunos-ativos.component.html',
  styleUrl: './alunos-ativos.component.css'
})
export class AlunosAtivosComponent {

  @ViewChild('searchInput') searchInput!: ElementRef;

  displayedColumns: string[] = ['nome', 'endereco','nascimento', 'telefone', 'criacao'];
  dataSource = new MatTableDataSource<Aluno>();

  constructor(private alunosService: AlunosService) {}

  // METODO DE INICIALIZAÇÃO DO COMPOONENT
  ngOnInit() {
    this.alunosService.getAlunos().subscribe((response: AlunosResponse) => {
      const alunosAtivos = response.content.filter(aluno => aluno.ativo === 'S');
      this.dataSource.data = alunosAtivos;
    });
  }

  // METODO PARA FOCAR NO INPUT AO CLICAR NO ICONE
  focusInput() {
    this.searchInput.nativeElement.focus();
  }

  // METODO PARA FORMATAR DATAS PARA PADRÃO BR
  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  // METODO DE FILTRO PARA A BARRA DE PESQUISA
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Aluno, filter: string) => {
      const dataStr = `${data.nome} ${data.endereco.cep} ${data.endereco.logradouro} ${data.endereco.bairro} ${data.endereco.estado} ${data.telefone} ${this.formatDate(data.dataNascimento)} ${this.formatDate(data.dataCriacao)}`.toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
    this.dataSource.filter = filterValue;
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
