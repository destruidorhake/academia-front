import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlunosService } from '../Services/alunos.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RegistrarAluno } from '../Alunos/models/aluno.model';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';



@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatIconModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  alunoForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private alunosService: AlunosService) {
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

  registrarAluno(): void {
    if (this.alunoForm.valid) {
      // Remover as máscaras dos campos de input
      const aluno: RegistrarAluno = {
        nome: this.alunoForm.value.nome,
        cpf: this.alunoForm.value.cpf.replace(/\D/g, ''),
        telefone: this.alunoForm.value.telefone.replace(/\D/g, ''),
        endereco: {
          cep: this.alunoForm.value.cep.replace(/\D/g, ''),
          logradouro: this.alunoForm.value.logradouro,
          bairro: this.alunoForm.value.bairro,
          estado: this.alunoForm.value.estado,
          uf: this.alunoForm.value.uf
        }
      };

      // Enviar para o serviço
      this.alunosService.registrarAluno(aluno).subscribe(
        (response) => {
          console.log('Aluno registrado com sucesso:', response);
          this.successMessage = 'Aluno registrado com sucesso!';
          this.errorMessage = '';
          this.alunoForm.reset();
        },
        (error) => {
          console.error('Erro ao registrar aluno:', error);
          this.errorMessage = error.error.message;
          this.successMessage = '';
        }
      );
    } else {
      console.error('Formulário inválido. Verifique os campos.');
      this.errorMessage = 'Formulário inválido. Verifique os campos.';
      this.successMessage = '';
    }
  }

  capitalizeWords(value: string): string {
    if (!value) return value;
    return value.replace(/\b\w/g, char => char.toUpperCase());
  }
}
