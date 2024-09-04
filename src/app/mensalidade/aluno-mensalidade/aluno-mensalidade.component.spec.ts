import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoMensalidadeComponent } from './aluno-mensalidade.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { AlunosService } from '../../Services/Alunos.Service/alunos.service';

describe('AlunoMensalidadeComponent', () => {
  let component: AlunoMensalidadeComponent;
  let fixture: ComponentFixture<AlunoMensalidadeComponent>;
  let alunosService: jasmine.SpyObj<AlunosService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    // Cria um mock do AlunosService com spies para métodos
    const alunosServiceSpy = jasmine.createSpyObj('AlunosService', ['getMensalidades', 'updateStatus']);
    alunosServiceSpy.getMensalidades.and.returnValue(of([
      { aluno: { id: 1, nome: 'João' }, dataVencimento: '2024-08-01', valor: 100, status: 1 },
      { aluno: { id: 2, nome: 'Maria' }, dataVencimento: '2024-08-05', valor: 150, status: 2 }
    ]));
    alunosServiceSpy.updateStatus.and.returnValue(of({}));

    // Cria um mock do ActivatedRoute com o id do aluno
    route = { paramMap: of(convertToParamMap({ id: '1' })) } as any;

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule
      ],
      declarations: [AlunoMensalidadeComponent],
      providers: [
        { provide: AlunosService, useValue: alunosServiceSpy },
        { provide: ActivatedRoute, useValue: route }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlunoMensalidadeComponent);
    component = fixture.componentInstance;
    alunosService = TestBed.inject(AlunosService) as jasmine.SpyObj<AlunosService>;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar e carregar mensalidades do aluno', () => {
    // Verifica se o método getMensalidades foi chamado com o id correto
    expect(alunosService.getMensalidades).toHaveBeenCalledWith(1);
    expect(component.dataSource.data.length).toBe(2); // Espera-se 2 mensalidades carregadas
  });

  it('deve formatar a data corretamente', () => {
    const formattedDate = component.formatDate('2024-08-01');
    expect(formattedDate).toBe('01/08/2024');
  });

  it('deve aplicar o filtro corretamente', () => {
    component.applyFilter({ target: { value: 'João' } } as unknown as Event);
    expect(component.dataSource.filteredData.length).toBe(1); // Espera-se 1 resultado filtrado
  });

  it('deve aprovar pagamento e atualizar a lista', () => {
    spyOn(component, 'ngOnInit').and.callThrough(); // Espia o método ngOnInit para verificar se é chamado após a atualização

    component.aprovarPagamento(1);
    expect(alunosService.updateStatus).toHaveBeenCalledWith(1, 2); // Verifica se o status é atualizado
    expect(component.ngOnInit).toHaveBeenCalled(); // Verifica se ngOnInit é chamado após a atualização
  });
});
