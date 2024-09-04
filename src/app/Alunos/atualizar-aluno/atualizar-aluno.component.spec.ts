import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AlunosService } from '../../Services/Alunos.Service/alunos.service';
import { AlunosAtualizarComponent } from './atualizar-aluno.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AlunoDTO, UdpateAlunoDTO } from '../../models/alunos.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AlunosDetalheComponent', () => {
  let component: AlunosAtualizarComponent;
  let fixture: ComponentFixture<AlunosAtualizarComponent>;
  let alunosService: jasmine.SpyObj<AlunosService>;

  beforeEach(async () => {
    // Cria um mock do AlunosService com spy para métodos
    const alunosServiceSpy = jasmine.createSpyObj('AlunosService', ['getAlunoById', 'updateAluno', 'buscarEnderecoPorCep']);

    // Mock para retorno do método getAlunoById
    const alunoDtoMock: AlunoDTO = {
      id: 1,
      nome: 'João Silva',
      endereco: {
        cep: '12345-678',
        logradouro: 'Rua Exemplo',
        estado: 'SP',
        bairro: 'Centro',
        uf: 'SP'
      },
      dataNascimento: '2000-01-01',
      telefone: '(11) 99999-9999',
      dataCriacao: '2024-01-01T00:00:00Z',
      ativo: 'S'
    };
    alunosServiceSpy.getAlunoById.and.returnValue(of(alunoDtoMock));
    alunosServiceSpy.updateAluno.and.returnValue(of(alunoDtoMock));
    alunosServiceSpy.buscarEnderecoPorCep.and.returnValue(of({
      logradouro: 'Rua Exemplo',
      bairro: 'Centro',
      estado: 'SP',
      uf: 'SP'
    }));

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [AlunosAtualizarComponent],
      providers: [
        { provide: AlunosService, useValue: alunosServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlunosAtualizarComponent);
    component = fixture.componentInstance;
    alunosService = TestBed.inject(AlunosService) as jasmine.SpyObj<AlunosService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load aluno data on initialization', () => {
    // Verifica se o método getAlunoById foi chamado com o ID correto
    expect(alunosService.getAlunoById).toHaveBeenCalledWith(1);

    // Verifica se o formulário é preenchido com os dados do aluno
    expect(component.alunoForm.get('nome')?.value).toBe('João Silva');
    expect(component.alunoForm.get('cep')?.value).toBe('12345-678');
    // Verifique outros campos conforme necessário
  });

  it('should update aluno data on form submit', () => {
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

    component.atualizarAluno();

    // Verifica se o método updateAluno foi chamado com os parâmetros corretos
    const expectedPayload: UdpateAlunoDTO = {
      id: 1,
      nome: 'João Silva',
      dataNascimento: '2000-01-01',
      telefone: '(11) 99999-9999',
      endereco: {
        cep: '12345-678',
        logradouro: 'Rua Exemplo',
        bairro: 'Centro',
        estado: 'SP',
        uf: 'SP'
      },
      ativo: 'ativo',
      dataCriacao: '2024-01-01T00:00:00Z'
    };
    expect(alunosService.updateAluno).toHaveBeenCalledWith(1, expectedPayload);
  });

  it('should handle error on aluno update failure', () => {
    // Configura o mock para retornar um erro
    alunosService.updateAluno.and.returnValue(throwError(() => new Error('Erro ao atualizar aluno')));

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

    component.atualizarAluno();

    // Verifica se a mensagem de erro é exibida
    expect(component.errorMessage).toBe('Erro ao atualizar aluno. Tente novamente mais tarde!');
  });

  it('should fetch address on CEP change', () => {
    // Configura o mock para retorno da busca de endereço por CEP
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
});
