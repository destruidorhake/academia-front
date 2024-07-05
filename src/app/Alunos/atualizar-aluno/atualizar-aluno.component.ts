import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { AlunosService } from '../../Services/alunos.service';
import { RegistrarAluno } from '../models/aluno.model';
import { AuthService } from '../../Authentication/auth.service';

@Component({
  selector: 'app-alunos-atualizado',
  standalone: true,
  imports: [RouterModule,CommonModule, FormsModule,ReactiveFormsModule, MatButtonModule,MatFormFieldModule, MatIconModule, MatIconModule,NgxMaskDirective, NgxMaskPipe],
  templateUrl: './atualizar-aluno.component.html',
  styleUrl: './atualizar-aluno.component.css'
})
export class AlunosAtualizarComponent {
  alunoForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  alunoId: number = 0;

  constructor(
    private fb: FormBuilder,
    private alunosService: AlunosService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      estado: ['', Validators.required],
      uf: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.alunoId = Number(params.get('id'));
      if (this.alunoId) {
        this.carregarAluno(this.alunoId);
      }
    });
  }

  carregarAluno(id: number): void {
    this.alunosService.getAlunoById(id).subscribe(
      (aluno: RegistrarAluno) => {
        this.alunoForm.patchValue({
          nome: aluno.nome,
          cpf: aluno.cpf,
          telefone: aluno.telefone,
          cep: aluno.endereco.cep,
          logradouro: aluno.endereco.logradouro,
          bairro: aluno.endereco.bairro,
          estado: aluno.endereco.estado,
          uf: aluno.endereco.uf
        });
      },
      (error) => {
        console.error('Erro ao carregar aluno:', error);
        this.errorMessage = 'Erro ao carregar aluno. Verifique o console para mais detalhes.';
      }
    );
  }

  atualizarAluno(): void {
    if (this.alunoForm.valid) {
      const alunoAtualizado: RegistrarAluno = {
        nome: this.alunoForm.value.nome,
        cpf: this.alunoForm.value.cpf,
        telefone: this.alunoForm.value.telefone,
        endereco: {
          cep: this.alunoForm.value.cep,
          logradouro: this.alunoForm.value.logradouro,
          bairro: this.alunoForm.value.bairro,
          estado: this.alunoForm.value.estado,
          uf: this.alunoForm.value.uf
        }
      };

      this.alunosService.atualizarAluno(this.alunoId, alunoAtualizado).subscribe(
        () => {
          console.log('Aluno atualizado com sucesso!');
          this.successMessage = 'Aluno atualizado com sucesso! Redirecionando página em 5 segundos...';
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate([`/alunos`]);
          }, 5000);
        },
        (error) => {
          console.error('Erro ao atualizar aluno:', error);
          this.errorMessage = 'Erro ao atualizar aluno. Verifique o console para mais detalhes.';
        }
      );
      } else {
        console.error('Formulário inválido. Verifique os campos.');
        this.errorMessage = 'Formulário inválido. Verifique os campos.';
      }
  }
}
