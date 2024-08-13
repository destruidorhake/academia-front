import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconButton, MatIconAnchor, MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NavigationEnd, Router, RouterModule, Event } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../Usuarios/Authentication/auth.service';
import { filter } from 'rxjs';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit  {
  isSidebarOpen: boolean = true;
  showNavbar: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    // Subscribe to router events to dynamically control sidebar visibility
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showNavbar = this.shouldShowNavbar(event.urlAfterRedirects);
    });
  }

  // MÉTODO PARA SIDEBAR EM CELULARES
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // MÉTODO PARA VERIFICAR SE DEVE MOSTRAR A SIDEBAR
  shouldShowNavbar(url: string): boolean {
    return !url.includes('/login') && this.authService.isLoggedIn();
  }

  // MÉTODO PARA INICIALIZAR
  ngOnInit(): void {
    // Atualiza a visibilidade da sidebar ao iniciar
    this.showNavbar = this.shouldShowNavbar(this.router.url);
  }

  // MÉTODO PARA SAIR
  logout() {
    localStorage.clear();
    sessionStorage.clear();

    caches.keys().then(function(names) {
      for (let name of names) {
        caches.delete(name);
      }
    });

    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
