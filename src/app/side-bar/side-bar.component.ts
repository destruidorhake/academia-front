import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { MatIconButton, MatIconAnchor, MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';



@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatOptionModule, MatTableModule, MatIconModule, MatIconButton, MatIconAnchor, MatButtonModule, MatSidenavModule, MatToolbarModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit  {

  isDarkTheme: boolean = false;
  showNavbar: boolean = false;

  constructor(private router: Router) {
    CUSTOM_ELEMENTS_SCHEMA

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = this.shouldShowNavbar(event.urlAfterRedirects);
      }
    });
  }

  shouldShowNavbar(url: string): boolean {
    return !url.includes('/login');
  }

  ngOnInit(): void {
    this.showNavbar = true;
  }

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

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const theme = this.isDarkTheme ? 'dark-theme' : 'light-theme';
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(theme);
  }

}
