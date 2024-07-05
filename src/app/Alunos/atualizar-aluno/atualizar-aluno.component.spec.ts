import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosDetalheComponent } from './atualizar-aluno.component';

describe('AlunosDetalheComponent', () => {
  let component: AlunosDetalheComponent;
  let fixture: ComponentFixture<AlunosDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunosDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunosDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
