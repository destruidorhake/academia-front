import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectionList, MatListModule } from '@angular/material/list';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { UdpateAlunoDTO } from '../../models/alunos.model';
import { ESTADOS, UFS } from '../../models/estados-ufs.model';
import { AlunosService } from '../../Services/Alunos.Service/alunos.service';

@Component({
  selector: 'app-alunos-atualizado',
  standalone: true,
  imports: [
    MatChipsModule,
    RouterModule,
    CommonModule,
    MatMenuTrigger,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatTooltipModule,
    MatMenuModule,
    MatSelectionList,
    MatListModule
  ],
  templateUrl: './atualizar-aluno.component.html',
  styleUrl: './atualizar-aluno.component.css'
})
export class AlunosAtualizarComponent {
  alunoForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  redirectMessage: string = '';
  alunoId: number = 0;

  estados = ESTADOS;
  ufs = UFS;

  constructor(
    private fb: FormBuilder,
    private alunosService: AlunosService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.alunoId = Number(this.route.snapshot.paramMap.get('id'));

    this.alunoForm = this.fb.group({
      nome: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      uf: ['', [Validators.required]]
    });

    this.carregarAluno(this.alunoId);
  }

  carregarAluno(id: number): void {
    this.alunosService.getAlunoById(id).subscribe({
      next: (aluno) => {
        this.alunoForm.patchValue({
          nome: aluno.nome,
          dataNascimento: aluno.dataNascimento,
          telefone: aluno.telefone,
          cep: aluno.endereco.cep,
          logradouro: aluno.endereco.logradouro,
          bairro: aluno.endereco.bairro,
          estado: aluno.endereco.estado,
          uf: aluno.endereco.uf
        });
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar dados do aluno. Tente novamente mais tarde!';
        console.error('Erro ao carregar aluno:', err);
      }
    });
  }

  atualizarAluno(): void {
    if (this.alunoForm.valid) {
      const formValues = this.alunoForm.value;

      const alunoData: UdpateAlunoDTO = {
        id: this.alunoId,
        nome: formValues.nome,
        dataNascimento: formValues.dataNascimento,
        telefone: formValues.telefone,
        endereco: {
          cep: formValues.cep,
          logradouro: formValues.logradouro,
          bairro: formValues.bairro,
          estado: formValues.estado,
          uf: formValues.uf
        },
        ativo: 'ativo',
        dataCriacao: '2024-01-01T00:00:00Z',
      };

      this.alunosService.updateAluno(this.alunoId, alunoData).subscribe({
        next: () => {
          this.successMessage = 'Aluno atualizado com sucesso!';
          this.redirectMessage = 'Redirecionado para página anterior!';
          this.clearMessagesAfterDelay(3000, () => {
            this.router.navigate(['/search']);
          });
        },
        error: (err) => {
          if (err.status === 400) {
            this.errorMessage = 'Dados inválidos. Por favor, verifique os campos e tente novamente!';
          } else {
            this.errorMessage = 'Erro ao atualizar aluno. Tente novamente mais tarde!';
          }
          this.clearMessagesAfterDelay(5000);
        }
      });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente!';
      this.clearMessagesAfterDelay(0);
    }
  }

  private clearMessagesAfterDelay(delay: number, callback?: () => void): void {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
      this.redirectMessage = '';
      if (callback) {
        callback();
      }
    }, delay);
  }

  onCepChange(): void {
    const cepAtual = this.alunoForm.get('cep')?.value;

    if (cepAtual) {
      // Armazene o CEP atual antes de alterá-lo
      const cepAnterior = this.alunosService.cepAnterior || '';

      // Verifique se o CEP foi realmente alterado
      if (cepAtual !== cepAnterior) {
        this.alunosService.buscarEnderecoPorCep(cepAtual).subscribe({
          next: (endereco) => {
            // Preencha os campos com os dados retornados pelo CEP
            this.alunoForm.patchValue({
              logradouro: endereco.logradouro,
              bairro: endereco.bairro,
              estado: endereco.localidade,
              uf: endereco.uf
            });

            // Atualize o valor do CEP anterior
            this.alunosService.cepAnterior = cepAtual;
          },
          error: (err) => {
            console.error('Erro ao buscar endereço:', err);
          }
        });
      }
    }
  }}
