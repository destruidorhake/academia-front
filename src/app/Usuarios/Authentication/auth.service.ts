import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, catchError, of, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:8080/login'; // Ajuste para o URL do seu backend

  constructor(private http: HttpClient, private router: Router) { }

   // Método para realizar login
   login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(this.apiUrl, { email, password }).pipe(
      map(response => {
        if (response.token) {
          this.storeToken(response.token);
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))
    );
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Verifica se o usuário está logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // Faz o logout do usuário
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
