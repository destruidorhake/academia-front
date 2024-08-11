import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './Navegacao/nav-bar/nav-bar.component';
import { SideBarComponent } from './Navegacao/side-bar/side-bar.component';
import { AuthService } from './Usuarios/Authentication/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SideBarComponent ,NavBarComponent, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, SideBarComponent],
})
export class AppComponent {

  constructor(public authService: AuthService) {
    this.authService = authService;
  }

  // METODO VERIFICAR SEURANÇA E LOGIN DO SITE
  public getAuthService(): AuthService {
    return this.authService;
  }


}
