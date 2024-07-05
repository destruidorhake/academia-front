import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Mensalidade, RegistrarAluno } from '../Alunos/models/aluno.model';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private baseUrl = environment.local;

  constructor(private http: HttpClient) { }

  getAlunos(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/aluno`);
  }

  registrarAluno(aluno: RegistrarAluno): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/aluno`, aluno)
      .pipe(
        catchError((error) => {
          console.error('Erro ao registrar aluno:', error);
          throw error;
        })
      );
  }

  atualizarAluno(id: number, aluno: RegistrarAluno): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/aluno/${id}`, aluno)
      .pipe(
        catchError((error) => {
          console.error('Erro ao atualizar aluno:', error);
          throw error;
        })
      );
  }

  getAlunoById(id: number): Observable<RegistrarAluno> {
    return this.http.get<RegistrarAluno>(`${this.baseUrl}/aluno/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar aluno por ID:', error);
          throw error;
        })
      );
  }

  getMensalidades(params: any): Observable<Mensalidade[]> {
    const url = `${this.baseUrl}/mensalidade`;
    let queryParams = new HttpParams();
    if (params && params.status) {
      queryParams = queryParams.set('status', params.status);
    }

    return this.http.get<Mensalidade[]>(url, { params: queryParams });
  }

  desativarAluno(id: number): Observable<any> {
    console.log(`Tentando deletar aluno com ID: ${id}`);
    return this.http.delete<any>(`${this.baseUrl}/aluno/${id}`)
      .pipe(
        tap(() => console.log(`Aluno com ID ${id} deletado com sucesso`)),
        catchError((error) => {
          console.error(`Erro ao deletar aluno com ID ${id}:`, error);
          throw error;
        })
      );
  }

  reativarAluno(id: number): Observable<any> {
    console.log(`Tentando reativar aluno com ID: ${id}`);
    return this.http.put<any>(`${this.baseUrl}/aluno/reativar/${id}`, null)
      .pipe(
        tap(() => console.log(`Aluno com ID ${id} reativado com sucesso`)),
        catchError((error) => {
          console.error(`Erro ao reativar aluno com ID ${id}:`, error);
          throw error;
        })
      );
  }
}

