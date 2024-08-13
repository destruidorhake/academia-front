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
  cepAnterior: string = '';
  private baseUrl = environment.local;

  constructor(private http: HttpClient) { }

  getAlunos(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/aluno`);
  }

  createAluno(aluno: CreateAlunoDTO): Observable<CreateAlunoDTO> {
    return this.http.post<CreateAlunoDTO>(this.baseUrl + '/aluno', aluno);
  }

  updateAluno(id: number, alunoData: UdpateAlunoDTO): Observable<AlunoDTO> {
    return this.http.put<AlunoDTO>(`${this.baseUrl}/aluno/${id}`, alunoData)
      .pipe(catchError((error) => {
          console.error(error);
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

  desativarAluno(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/aluno/${id}`)
      .pipe(catchError((error) => {
          console.error(error);
          throw error;
        })
      );
  }

  reativarAluno(id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/aluno/reativar/${id}`, null)
      .pipe(catchError((error) => {
          console.error(error);
          throw error;
        })
      );
  }

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

  updateStatus(id: number, status: number): Observable<any> {
    const url = `${this.baseUrl}/mensalidade/${id}`;
    return this.http.put(url, { status });
  }

  buscarEnderecoPorCep(cep: string): Observable<any> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<any>(url)
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar endereço por CEP:', error);
          throw error;
        })
      );
  }


}
