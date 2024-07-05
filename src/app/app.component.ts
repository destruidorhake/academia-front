import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "./side-bar/side-bar.component";
import { AuthService } from './Authentication/auth.service';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavBarComponent, CommonModule, SideBarComponent]
})
export class AppComponent {

  constructor(public authService: AuthService) {
    this.authService = authService;
  }

  public getAuthService(): AuthService {
    return this.authService;
  }


}
