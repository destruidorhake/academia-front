import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoMensalidadeComponent } from './aluno-mensalidade.component';

describe('AlunoMensalidadeComponent', () => {
  let component: AlunoMensalidadeComponent;
  let fixture: ComponentFixture<AlunoMensalidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunoMensalidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunoMensalidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
