import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../Authentication/auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/login') {
          window.location.reload();
        }
      });
  }

  disableAutocomplete() {
    const inputField = document.getElementById('password') as HTMLInputElement;
    if (inputField) {
      inputField.setAttribute('autocomplete', 'new-password');
    }
  }

  onLogin(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/alunos']); // Redireciona para a página de alunos após o login
    } else {
      this.loginError = true; // Exibe mensagem de erro no login
    }
  }
}
