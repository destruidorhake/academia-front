import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensalidadesAlunosTotaisComponent } from './mensalidades-alunos-totais.component';

describe('MensalidadesAlunosTotaisComponent', () => {
  let component: MensalidadesAlunosTotaisComponent;
  let fixture: ComponentFixture<MensalidadesAlunosTotaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensalidadesAlunosTotaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensalidadesAlunosTotaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
