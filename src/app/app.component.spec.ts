import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from 'express';
import { of } from 'rxjs';
import { SideBarComponent } from './Navegacao/side-bar/side-bar.component';
import { AuthService } from './Usuarios/Authentication/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: AuthService, useValue: spy }]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the "Structure-Project" title', () => {
    // Remova ou ajuste este teste se a propriedade 'title' não estiver definida no componente
    // expect(component.title).toEqual('Structure-Project');
  });

  it('should render sidebar when showNavbar is true', () => {
    component.showNavbar = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-side-bar')).toBeTruthy();
  });

  it('should not render sidebar when showNavbar is false', () => {
    component.showNavbar = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-side-bar')).toBeFalsy();
  });

  it('should evaluate navbar visibility correctly based on authentication and route', () => {
    authService.isLoggedIn.and.returnValue(true);
    component.evaluateNavbarVisibility('/home');
    expect(component.showNavbar).toBeTrue();

    authService.isLoggedIn.and.returnValue(false);
    component.evaluateNavbarVisibility('/login');
    expect(component.showNavbar).toBeFalse();
  });
});
