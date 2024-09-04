import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarComponent } from './registrar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CreateAlunoDTO } from '../../models/alunos.model';
import { AlunosService } from '../../Services/Alunos.Service/alunos.service';

describe('RegistrarComponent', () => {
  let component: RegistrarComponent;
  let fixture: ComponentFixture<RegistrarComponent>;
  let alunosService: jasmine.SpyObj<AlunosService>;

  beforeEach(async () => {
    // Cria um mock do AlunosService com spy para métodos
    const alunosServiceSpy = jasmine.createSpyObj('AlunosService', ['createAluno', 'buscarEnderecoPorCep']);

    // Mock para retorno do método createAluno
    alunosServiceSpy.createAluno.and.returnValue(of({}));
    alunosServiceSpy.buscarEnderecoPorCep.and.returnValue(of({
      logradouro: 'Rua Exemplo',
      bairro: 'Centro',
      estado: 'SP',
      uf: 'SP'
    }));

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [RegistrarComponent],
      providers: [
        { provide: AlunosService, useValue: alunosServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarComponent);
    component = fixture.componentInstance;
    alunosService = TestBed.inject(AlunosService) as jasmine.SpyObj<AlunosService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with correct default values', () => {
    expect(component.alunoForm).toBeTruthy();
    expect(component.alunoForm.controls['nome'].value).toBe('');
    expect(component.alunoForm.controls['dataNascimento'].value).toBe('');
    expect(component.alunoForm.controls['telefone'].value).toBe('');
    expect(component.alunoForm.controls['cep'].value).toBe('');
    expect(component.alunoForm.controls['logradouro'].value).toBe('');
    expect(component.alunoForm.controls['bairro'].value).toBe('');
    expect(component.alunoForm.controls['estado'].value).toBe('');
    expect(component.alunoForm.controls['uf'].value).toBe('');
  });

  it('should call createAluno and show success message on form submit', () => {
    // Define os valores do formulário
    component.alunoForm.setValue({
      nome: 'João Silva',
      dataNascimento: '2000-01-01',
      telefone: '(11) 99999-9999',
      cep: '12345-678',
      logradouro: 'Rua Exemplo',
      bairro: 'Centro',
      estado: 'SP',
      uf: 'SP'
    });

    component.registrarAluno();

    // Verifica se o método createAluno foi chamado com os parâmetros corretos
    const expectedPayload: CreateAlunoDTO = {
      nome: 'João Silva',
      dataNascimento: '2000-01-01',
      telefone: '(11) 99999-9999',
      endereco: {
        cep: '12345-678',
        logradouro: 'Rua Exemplo',
        bairro: 'Centro',
        estado: 'SP',
        uf: 'SP'
      }
    };
    expect(alunosService.createAluno).toHaveBeenCalledWith(expectedPayload);

    // Verifica se a mensagem de sucesso é exibida
    expect(component.successMessage).toBe('Aluno registrado com sucesso!');
  });

  it('should handle error on createAluno failure', () => {
    // Configura o mock para retornar um erro
    alunosService.createAluno.and.returnValue(throwError(() => new Error('Erro ao registrar aluno')));

    // Define os valores do formulário
    component.alunoForm.setValue({
      nome: 'João Silva',
      dataNascimento: '2000-01-01',
      telefone: '(11) 99999-9999',
      cep: '12345-678',
      logradouro: 'Rua Exemplo',
      bairro: 'Centro',
      estado: 'SP',
      uf: 'SP'
    });

    component.registrarAluno();

    // Verifica se a mensagem de erro é exibida
    expect(component.errorMessage).toBe('Erro ao registrar aluno. Tente novamente mais tarde!');
  });

  it('should fetch address on CEP change', () => {
    // Define o CEP para disparar a busca de endereço
    component.alunoForm.get('cep')?.setValue('12345-678');
    component.onCepChange();

    // Verifica se o método buscarEnderecoPorCep foi chamado com o CEP correto
    expect(alunosService.buscarEnderecoPorCep).toHaveBeenCalledWith('12345-678');

    // Verifica se os campos do endereço foram atualizados
    expect(component.alunoForm.get('logradouro')?.value).toBe('Rua Exemplo');
    expect(component.alunoForm.get('bairro')?.value).toBe('Centro');
    expect(component.alunoForm.get('estado')?.value).toBe('SP');
    expect(component.alunoForm.get('uf')?.value).toBe('SP');
  });

  it('should handle address fetch error gracefully', () => {
    // Configura o mock para retornar um erro ao buscar o endereço
    alunosService.buscarEnderecoPorCep.and.returnValue(throwError(() => new Error('Erro ao buscar endereço')));

    // Define o CEP para disparar a busca de endereço
    component.alunoForm.get('cep')?.setValue('12345-678');
    component.onCepChange();

  });
});
