import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosAtivosComponent } from './alunos-ativos.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AlunosService } from '../../Services/Alunos.Service/alunos.service';
import { ResponseDTO } from '../../models/alunos.model';

describe('AlunosAtivosComponent', () => {
  let component: AlunosAtivosComponent;
  let fixture: ComponentFixture<AlunosAtivosComponent>;
  let alunosServiceSpy: jasmine.SpyObj<AlunosService>;

  const mockAlunosResponse: ResponseDTO = {
    content: [
      {
        id: 1,
        nome: 'João Silva',
        endereco: {
          cep: '12345-678',
          logradouro: 'Rua A',
          bairro: 'Bairro B',
          estado: 'Estado C',
          uf: 'UF'
        },
        dataNascimento: '2000-01-01',
        dataCriacao: '2020-01-01',
        telefone: '11999999999',
        ativo: 'S'
      },
      {
        id: 2,
        nome: 'Maria Souza',
        endereco: {
          cep: '98765-432',
          logradouro: 'Rua X',
          bairro: 'Bairro Y',
          estado: 'Estado Z',
          uf: 'UF'
        },
        dataNascimento: '1995-12-12',
        dataCriacao: '2018-12-12',
        telefone: '11988888888',
        ativo: 'N'
      }
    ],
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false,
    size: 0,
    number: 0,
    sort: {
      unsorted: false,
      empty: false,
      sorted: false
    },
    numberOfElements: 0,
    pageable: {
      pageNumber: 0,
      pageSize: 0,
      sort: {
        unsorted: false,
        empty: false,
        sorted: false
      },
      offset: 0,
      unpaged: false,
      paged: false
    },
    empty: false
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AlunosService', ['getAlunos']);
    await TestBed.configureTestingModule({
      imports: [AlunosAtivosComponent],
      providers: [{ provide: AlunosService, useValue: spy }]
    }).compileComponents();

    alunosServiceSpy = TestBed.inject(AlunosService) as jasmine.SpyObj<AlunosService>;
    alunosServiceSpy.getAlunos.and.returnValue(of(mockAlunosResponse));

    fixture = TestBed.createComponent(AlunosAtivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar alunos ativos ao inicializar', () => {
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].nome).toBe('João Silva');
  });

  it('deve aplicar o filtro corretamente', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'João';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.dataSource.filter).toBe('joão');
    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].nome).toBe('João Silva');
  });

  it('deve formatar a data corretamente', () => {
    const formattedDate = component.formatDate('2000-01-01');
    expect(formattedDate).toBe('01/01/2000');
  });

  it('deve formatar o telefone corretamente', () => {
    const formattedTelefone = component.formatTelefone('11999999999');
    expect(formattedTelefone).toBe('+55 (11) 99999-9999');
  });

  it('deve focar no input ao chamar focusInput', () => {
    spyOn(component.searchInput.nativeElement, 'focus');
    component.focusInput();
    expect(component.searchInput.nativeElement.focus).toHaveBeenCalled();
  });
});
