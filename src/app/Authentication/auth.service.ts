import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  constructor() { }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(username: string, password: string): boolean {
    if (username === 'admin_academia' && password === 'a') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
  }
}
