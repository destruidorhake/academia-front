import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosAtivosComponent } from './alunos-ativos.component';

describe('AlunosAtivosComponent', () => {
  let component: AlunosAtivosComponent;
  let fixture: ComponentFixture<AlunosAtivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunosAtivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunosAtivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
