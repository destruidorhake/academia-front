import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosComponent } from './alunos.component';
import { of } from 'rxjs';
import { AlunosService } from '../../Services/Alunos.Service/alunos.service';
import { DialogService } from '../../Services/Dialog.Service/dialog.service';
import { Router } from '@angular/router';

describe('AlunosComponent', () => {
  let component: AlunosComponent;
  let fixture: ComponentFixture<AlunosComponent>;
  let alunosService: jasmine.SpyObj<AlunosService>;
  let dialogService: jasmine.SpyObj<DialogService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const alunosServiceSpy = jasmine.createSpyObj('AlunosService', ['getAlunos', 'reativarAluno', 'desativarAluno']);
    const dialogServiceSpy = jasmine.createSpyObj('DialogService', ['openConfirmDialog']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AlunosComponent],
      providers: [
        { provide: AlunosService, useValue: alunosServiceSpy },
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunosComponent);
    component = fixture.componentInstance;
    alunosService = TestBed.inject(AlunosService) as jasmine.SpyObj<AlunosService>;
    dialogService = TestBed.inject(DialogService) as jasmine.SpyObj<DialogService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os alunos', () => {
    const mockAlunos = { content: [{ id: 1, nome: 'Aluno Teste', endereco: { cep: '12345', logradouro: 'Rua X', bairro: 'Bairro Y', estado: 'Estado Z', uf: 'UF' }, dataNascimento: '2000-01-01', telefone: '1234567890', dataCriacao: '2023-01-01', ativo: 'S' }] };
    alunosService.getAlunos.and.returnValue(of(mockAlunos));

    component.carregarAlunos();
    expect(component.dataSource.data).toEqual(mockAlunos.content);
  });

  it('deve aplicar o filtro corretamente', () => {
    const event = { target: { value: 'Teste' } } as unknown as Event;
    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('teste');
  });

  it('deve formatar a data corretamente', () => {
    const formattedDate = component.formatDate('2023-08-19');
    expect(formattedDate).toBe('19/08/2023');
  });

  it('deve formatar o telefone corretamente', () => {
    const formattedTelefone = component.formatTelefone('11987654321');
    expect(formattedTelefone).toBe('+55 (11) 98765-4321');
  });

  it('deve navegar para a página de atualização', () => {
    const alunoId = 1;
    component.navigateToAtualizar(alunoId);
    expect(router.navigate).toHaveBeenCalledWith(['/search/atualizar', alunoId]);
  });
});
