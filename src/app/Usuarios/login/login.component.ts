import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../Authentication/auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  infoMessage: string = '';
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/login') {
          this.resetToLogin();
        }
      });

    this.disableAutocomplete(); // Desabilitar autocomplete ao inicializar
  }

  resetToLogin(): void {
    this.router.navigateByUrl('/login', { replaceUrl: true }).then(() => {
      window.location.reload();
    });
  }

  disableAutocomplete(): void {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const emailField = document.getElementById('username') as HTMLInputElement;

    if (passwordField) {
      passwordField.setAttribute('autocomplete', 'new-password');
    }

    if (emailField) {
      emailField.setAttribute('autocomplete', 'off');
    }
  }

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (success: boolean) => {
        if (success) {
          // Armazenar o token no localStorage
          const token = this.authService.getToken();
          this.router.navigate(['/search']);  // Redirecionar para a página inicial
        } else {
          this.infoMessage = 'Login falhou. Verifique suas credenciais!';
          this.loginError = true;
        }
      },
      error: () => {
        this.errorMessage = 'Erro ao enviar as credenciais de login!';
        this.loginError = true;
      }
    });
  }
}
