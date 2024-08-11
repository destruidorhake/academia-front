import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environment';
import { RegistrarAluno, Mensalidade } from '../../models/aluno.model';
import { AlunoDTO, CreateAlunoDTO, UdpateAlunoDTO } from '../../models/alunos.model';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private baseUrl = environment.local;

  constructor(private http: HttpClient) { }

  // METODO PARA OBETER ALUNOS
  getAlunos(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/aluno`);
  }

  // METODO PARA REGISTRAR ALUNOS NO BANCO
  createAluno(aluno: CreateAlunoDTO): Observable<CreateAlunoDTO> {
    return this.http.post<CreateAlunoDTO>(this.baseUrl + '/aluno', aluno);
  }

  // METODO PARA ATUALIZAR ALUNO PELO ID
  updateAluno(id: number, alunoData: UdpateAlunoDTO): Observable<AlunoDTO> {
    console.log('Atualizando aluno com dados:', alunoData);
    return this.http.put<AlunoDTO>(`${this.baseUrl}/aluno/${id}`, alunoData)
      .pipe(
        tap(response => console.log('Resposta do backend:', response)),
        catchError((error) => {
          console.error('Erro ao atualizar aluno:', error);
          throw error;
        })
      );
  }

  // METODO PARA PEGAR ALUNO PELO ID
  getAlunoById(id: number): Observable<RegistrarAluno> {
    return this.http.get<RegistrarAluno>(`${this.baseUrl}/aluno/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar aluno por ID:', error);
          throw error;
        })
      );
  }


  // METODO PARA DESATIVAR ALUNO POR ID
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

  // METODO PARA REATIVAR ALUNO DESATIVADO PELO ID DO ALUNO
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

  // METODO PARA OBTER MENSALIDADES GERAIS
  getMensalidades(alunoId: number, status?: number): Observable<Mensalidade[]> {
    const url = `${this.baseUrl}/mensalidade`;
    let queryParams = new HttpParams().set('alunoId', alunoId.toString());

    if (status) {
      queryParams = queryParams.set('status', status.toString());
    }

  return this.http.get<Mensalidade[]>(url, { params: queryParams })
    .pipe(
      catchError((error) => {
        console.error('Erro ao obter mensalidades:', error);
        throw error;
      })
    );
  }
  // Atualizar o status de uma mensalidade
  updateStatus(id: number, status: number): Observable<any> {
    const url = `${this.baseUrl}/mensalidade/${id}`;
    return this.http.put(url, { status });
  }
}



