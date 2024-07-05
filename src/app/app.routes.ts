import { RouterModule, Routes } from '@angular/router';
import { AlunosComponent } from './Alunos/alunos.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { AuthGuard } from './Authentication/auth.guard';
import { MensalidadeComponent } from './mensalidade/mensalidade.component';
import { AlunosAtualizarComponent } from './Alunos/atualizar-aluno/atualizar-aluno.component';
import { AlunosAtivosComponent } from './Alunos/alunos-ativos/alunos-ativos.component';
import { AlunoMensalidadeComponent } from './mensalidade/aluno-mensalidade/aluno-mensalidade.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent, canActivate: [AuthGuard] },
  { path: 'mensalidade', component: MensalidadeComponent, canActivate: [AuthGuard] },
  { path: 'alunos', component: AlunosComponent, canActivate: [AuthGuard] },
  { path: 'ativos', component: AlunosAtivosComponent, canActivate: [AuthGuard] },
  { path: 'aluno/mensalidade/:id', component: AlunoMensalidadeComponent, canActivate: [AuthGuard] },
  { path: 'mensalidade/:id', component: MensalidadeComponent, canActivate: [AuthGuard] },
  { path: 'atualizar/:id', component: AlunosAtualizarComponent, canActivate: [AuthGuard] },

];

export const routing = RouterModule.forRoot(routes);
