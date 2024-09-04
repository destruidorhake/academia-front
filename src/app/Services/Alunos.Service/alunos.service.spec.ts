import { TestBed } from '@angular/core/testing';

import { AlunosService } from './alunos.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AlunoDTO, CreateAlunoDTO, UdpateAlunoDTO, MensalidadeDTO } from '../../models/alunos.model';
import { environment } from '../environment';

describe('AlunosServiceService', () => {
  let service: AlunosService;
  let httpMock: HttpTestingController;

  const baseUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlunosService]
    });

    service = TestBed.inject(AlunosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve obter alunos', () => {
    const dummyAlunos: AlunoDTO[] = [
      { id: 1, nome: 'Aluno 1', endereco: { cep: '01001-000', logradouro: 'Rua A', estado: 'SP', bairro: 'Centro', uf: 'SP' }, dataNascimento: '2000-01-01', telefone: '123456789', dataCriacao: '2024-01-01', ativo: 'Sim' },
      { id: 2, nome: 'Aluno 2', endereco: { cep: '02002-000', logradouro: 'Rua B', estado: 'SP', bairro: 'Zona Norte', uf: 'SP' }, dataNascimento: '2001-01-01', telefone: '987654321', dataCriacao: '2024-01-02', ativo: 'Não' }
    ];

    service.getAlunos().subscribe(alunos => {
      expect(alunos.length).toBe(2);
      expect(alunos).toEqual(dummyAlunos);
    });

    const req = httpMock.expectOne(`${baseUrl}/aluno`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyAlunos);
  });

  it('deve criar um aluno', () => {
    const newAluno: CreateAlunoDTO = {
      nome: 'Novo Aluno',
      dataNascimento: '2002-02-02',
      telefone: '555555555',
      endereco: { cep: '03003-000', logradouro: 'Rua C', estado: 'SP', bairro: 'Zona Leste', uf: 'SP' }
    };

    const createdAluno: AlunoDTO = {
      id: 1,
      nome: newAluno.nome,
      dataNascimento: newAluno.dataNascimento,
      telefone: newAluno.telefone,
      endereco: newAluno.endereco,
      dataCriacao: '2024-01-01',
      ativo: 'Sim'
    };

    service.createAluno(newAluno).subscribe(aluno => {
      expect(aluno).toEqual(createdAluno);
    });

    const req = httpMock.expectOne(`${baseUrl}/aluno`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newAluno);
    req.flush(createdAluno);
  });

  it('deve atualizar um aluno', () => {
    const alunoData: UdpateAlunoDTO = {
      id: 1,
      nome: 'Aluno Atualizado',
      dataNascimento: '2000-01-01',
      telefone: '123456789',
      endereco: { cep: '01001-000', logradouro: 'Rua A', estado: 'SP', bairro: 'Centro', uf: 'SP' },
      ativo: 'Sim',
      dataCriacao: '2024-01-01'
    };

    const updatedAluno: AlunoDTO = {
      id: 1,
      nome: alunoData.nome,
      dataNascimento: alunoData.dataNascimento,
      telefone: alunoData.telefone,
      endereco: alunoData.endereco,
      dataCriacao: alunoData.dataCriacao,
      ativo: alunoData.ativo
    };

    service.updateAluno(1, alunoData).subscribe(aluno => {
      expect(aluno).toEqual(updatedAluno);
    });

    const req = httpMock.expectOne(`${baseUrl}/aluno/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(alunoData);
    req.flush(updatedAluno);
  });

  it('deve obter um aluno por ID', () => {
    const aluno: AlunoDTO = {
      id: 1,
      nome: 'Aluno',
      dataNascimento: '2000-01-01',
      telefone: '123456789',
      endereco: { cep: '01001-000', logradouro: 'Rua A', estado: 'SP', bairro: 'Centro', uf: 'SP' },
      dataCriacao: '2024-01-01',
      ativo: 'Sim'
    };

    service.getAlunoById(1).subscribe(alunoData => {
      expect(alunoData).toEqual(aluno);
    });

    const req = httpMock.expectOne(`${baseUrl}/aluno/1`);
    expect(req.request.method).toBe('GET');
    req.flush(aluno);
  });

  it('deve desativar um aluno', () => {
    service.desativarAluno(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${baseUrl}/aluno/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('deve reativar um aluno', () => {
    service.reativarAluno(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${baseUrl}/aluno/reativar/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });

  it('deve obter mensalidades', () => {
    const dummyMensalidades: MensalidadeDTO[] = [
      { id: 1, aluno: { id: 1, nome: 'Aluno 1', endereco: { cep: '01001-000', logradouro: 'Rua A', bairro: 'Centro', estado: 'SP', uf: 'SP' }, telefone: '123456789', dataCriacao: '2024-01-01', ativo: 'Sim' }, dataVencimento: '2024-09-01', valor: 100, status: 1 },
      { id: 2, aluno: { id: 1, nome: 'Aluno 1', endereco: { cep: '01001-000', logradouro: 'Rua A', bairro: 'Centro', estado: 'SP', uf: 'SP' }, telefone: '123456789', dataCriacao: '2024-01-01', ativo: 'Sim' }, dataVencimento: '2024-10-01', valor: 150, status: 2 }
    ];

    service.getMensalidades(1).subscribe(mensalidades => {
      expect(mensalidades.length).toBe(2);
      expect(mensalidades).toEqual(dummyMensalidades);
    });

    const req = httpMock.expectOne(`${baseUrl}/mensalidade?alunoId=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMensalidades);
  });

  it('deve atualizar o status de uma mensalidade', () => {
    const statusUpdate = { status: 2 };

    service.updateStatus(1, 2).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${baseUrl}/mensalidade/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(statusUpdate);
    req.flush(null);
  });

  it('deve buscar endereço por CEP', () => {
    const cep = '01001-000';
    const addressData = { cep, logradouro: 'Praça da Sé', estado: 'SP', bairro: 'Centro', uf: 'SP' };

    service.buscarEnderecoPorCep(cep).subscribe(address => {
      expect(address).toEqual(addressData);
    });

    const req = httpMock.expectOne(`https://viacep.com.br/ws/${cep}/json/`);
    expect(req.request.method).toBe('GET');
    req.flush(addressData);
  });
});
