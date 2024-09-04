import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensalidadesAlunosTotaisComponent } from './mensalidades-alunos-totais.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AlunosService } from '../../Services/Alunos.Service/alunos.service';

describe('MensalidadesAlunosTotaisComponent', () => {
  let component: MensalidadesAlunosTotaisComponent;
  let fixture: ComponentFixture<MensalidadesAlunosTotaisComponent>;
  let alunosService: jasmine.SpyObj<AlunosService>;

  beforeEach(async () => {
    // Cria um mock do AlunosService com spies para métodos
    const alunosServiceSpy = jasmine.createSpyObj('AlunosService', ['getMensalidades']);
    alunosServiceSpy.getMensalidades.and.returnValue(of([
      { aluno: { nome: 'João', cpf: '12345678900' }, dataVencimento: '2024-08-01', valor: 100, status: 1 },
      { aluno: { nome: 'Maria', cpf: '09876543211' }, dataVencimento: '2024-08-05', valor: 150, status: 2 }
    ]));

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatOptionModule,
        RouterModule
      ],
      declarations: [MensalidadesAlunosTotaisComponent],
      providers: [
        { provide: AlunosService, useValue: alunosServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MensalidadesAlunosTotaisComponent);
    component = fixture.componentInstance;
    alunosService = TestBed.inject(AlunosService) as jasmine.SpyObj<AlunosService>;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar e carregar mensalidades', () => {
    // Verifica se o método getMensalidades foi chamado
    expect(alunosService.getMensalidades).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(2); // Espera-se 2 mensalidades carregadas
  });

  it('deve formatar o nome do status corretamente', () => {
    expect(component.getStatusName(1)).toBe('PENDENTE');
    expect(component.getStatusName(2)).toBe('PAGA');
    expect(component.getStatusName(3)).toBe('VENCIDA');
    expect(component.getStatusName(4)).toBe('ANULADA');
    expect(component.getStatusName(999)).toBe(''); // Valor desconhecido
  });

  it('deve aplicar o filtro corretamente', () => {
    component.applyFilter({ target: { value: 'João' } } as unknown as Event);
    expect(component.dataSource.filteredData.length).toBe(1); // Espera-se 1 resultado filtrado
  });

  it('deve focar o campo de pesquisa ao chamar focusInput()', () => {
    const focusSpy = spyOn(component.searchInput.nativeElement, 'focus');
    component.focusInput();
    expect(focusSpy).toHaveBeenCalled();
  });
});
