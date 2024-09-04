import { Routes } from '@angular/router';
import { AlunoMensalidadeComponent } from './mensalidade/aluno-mensalidade/aluno-mensalidade.component';
import { RegistrarComponent } from './Alunos/registrar/registrar.component';
import { AuthGuard } from './Usuarios/Authentication/auth.guard';
import { LoginComponent } from './Usuarios/login/login.component';
import { MensalidadesAlunosTotaisComponent } from './mensalidade/mensalidades-alunos-totais/mensalidades-alunos-totais.component';
import { AlunosComponent } from './Alunos/Alunos/alunos.component';
import { AlunosAtivosComponent } from './Alunos/alunos-ativos/alunos-ativos.component';
import { AlunosAtualizarComponent } from './Alunos/atualizar-aluno/atualizar-aluno.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'search',
    canActivate: [AuthGuard],
    data: { allowedUserTypes: ['alunos'] },
    children: [
      { path: '', component: AlunosComponent },
      { path: 'registrar', component: RegistrarComponent },
      { path: 'ativos', component: AlunosAtivosComponent },
      { path: 'mensalidade/:id', component: AlunoMensalidadeComponent },
      { path: 'mensalidades', component: MensalidadesAlunosTotaisComponent },
      { path: 'atualizar/:id', component: AlunosAtualizarComponent },
      { path: '**', component: LoginComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
