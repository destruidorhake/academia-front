import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuTrigger } from '@angular/material/menu';
import {MatChipsModule, MatChipInputEvent} from '@angular/material/chips';
import { CreateAlunoDTO } from '../../models/alunos.model';
import { ESTADOS, UFS } from '../../models/estados-ufs.model';
import { AlunosService } from '../../Services/Alunos.Service/alunos.service';


@Component({
  selector: 'app-registrar',
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
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  alunoForm!: FormGroup;
  maxDate: string = '';

  // Mensagens
  errorMessage: string = '';
  infoMessage: string = '';
  successMessage: string = '';
  limpaFormulario: string = '';

  // Listas de opções para Estado e UF
  estados = ESTADOS;
  ufs = UFS;

  constructor(private fb: FormBuilder, private alunosService: AlunosService) {
    // Calcular a data máxima permitida
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
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
  }

  openDatePicker(input: HTMLInputElement): void {
    input.click();
  }

  blockInput(event: KeyboardEvent): void {
    event.preventDefault();
  }

  registrarAluno(): void {
    if (this.alunoForm.valid) {
      const formValues = this.alunoForm.value;

      const alunoData: CreateAlunoDTO = {
        nome: formValues.nome,
        dataNascimento: formValues.dataNascimento,
        telefone: formValues.telefone,
        endereco: {
          cep: formValues.cep,
          logradouro: formValues.logradouro,
          bairro: formValues.bairro,
          estado: formValues.estado,
          uf: formValues.uf
        }
      };

      this.alunosService.createAluno(alunoData).subscribe({
        next: () => {
          this.successMessage = 'Aluno registrado com sucesso!';
          this.limpaFormulario = 'Limpando formulário!';
          this.clearMessagesAfterDelay();

          // Limpar Formulário
          setTimeout(() => {
            this.alunoForm.reset();
            this.limpaFormulario = '';
          }, 5000);
        },
        error: (err) => {
          if (err.status === 400 || err.status === 409) {
            // Capturar a mensagem de erro do backend
            this.infoMessage = err.error.message || 'Erro ao registrar aluno. Tente novamente mais tarde!';
          } else {
            this.errorMessage = 'Erro ao registrar aluno. Tente novamente mais tarde!';
          }
          this.clearMessagesAfterDelay();
        }
      });
    } else {
      this.infoMessage = 'Por favor, preencha todos os campos corretamente!';
      this.clearMessagesAfterDelay();
    }
  }

  private clearMessagesAfterDelay(): void {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
      this.infoMessage = '';
    }, 5000);
  }

}
