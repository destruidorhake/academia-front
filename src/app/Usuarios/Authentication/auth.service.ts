import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, catchError, of, Observable, map } from 'rxjs';
import { environment } from '../../Services/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private apiUrl = environment.local;

  constructor(private http: HttpClient, private router: Router) { }

  // Método para realizar login
  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(this.apiUrl + '/login', { email, password }).pipe(
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
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  // Verifica se o usuário está logado
  isLoggedIn(): boolean {
    if (this.isLocalStorageAvailable()) {
      return !!localStorage.getItem(this.tokenKey);
    }
    return false;
  }

  // Faz o logout do usuário
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.tokenKey);
    }
    this.router.navigate(['/login']);
  }

  // Método para verificar se localStorage está disponível
  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
