import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet, Event } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './Navegacao/nav-bar/nav-bar.component';
import { SideBarComponent } from './Navegacao/side-bar/side-bar.component';
import { AuthService } from './Usuarios/Authentication/auth.service';
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SideBarComponent ,NavBarComponent, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, SideBarComponent],
})
export class AppComponent {

  showNavbar: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
      this.router.events.pipe(
          filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
          this.evaluateNavbarVisibility(event.urlAfterRedirects);
      });
  }

  ngOnInit(): void {
      this.evaluateNavbarVisibility(this.router.url);
  }

  // Verifica se a sidebar deve ser mostrada com base na URL e no estado de autenticação
  private evaluateNavbarVisibility(url: string): void {
      // Verificar se o usuário está autenticado
      const isLoggedIn = this.authService.isLoggedIn();

      // Verificar se a URL contém '/login'
      const isLoginRoute = url.includes('/login');

      // Condição robusta para evitar exibir a sidebar na página de login
      if (!isLoggedIn && isLoginRoute) {
          this.showNavbar = false;
      } else if (isLoggedIn && !isLoginRoute) {
          this.showNavbar = true;
      } else {
          this.showNavbar = false; // fallback case
      }

      // Atualizar o estado de visibilidade da sidebar
      this.updateSidebarVisibility(this.showNavbar);
  }

  // Força a visibilidade da sidebar com base na avaliação anterior
  private updateSidebarVisibility(shouldShow: boolean): void {
      if (!shouldShow) {
          document.body.classList.add('no-sidebar');
      } else {
          document.body.classList.remove('no-sidebar');
      }
  }
}
