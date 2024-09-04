import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SideBarComponent } from './side-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from '../../Usuarios/Authentication/auth.service';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    authServiceSpy.isLoggedIn.and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [SideBarComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve alternar a visibilidade da sidebar', () => {
    expect(component.isSidebarOpen).toBeTrue();
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBeFalse();
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBeTrue();
  });

  it('deve mostrar a barra lateral para URLs não incluíndo "/login" quando o usuário estiver logado', () => {
    authService.isLoggedIn.and.returnValue(true);
    component.shouldShowNavbar('/search');
    expect(component.showNavbar).toBeTrue();

    component.shouldShowNavbar('/login');
    expect(component.showNavbar).toBeFalse();
  });

  it('deve ocultar a barra lateral para URLs incluindo "/login" quando o usuário estiver logado', () => {
    authService.isLoggedIn.and.returnValue(true);
    component.shouldShowNavbar('/login');
    expect(component.showNavbar).toBeFalse();
  });

  it('deve realizar logout e redirecionar para a página de login', () => {
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    const clearSpy = spyOn(localStorage, 'clear');
    const sessionClearSpy = spyOn(sessionStorage, 'clear');
    const cachesDeleteSpy = spyOn(caches, 'delete').and.returnValue(Promise.resolve(true));

    component.logout();

    expect(clearSpy).toHaveBeenCalled();
    expect(sessionClearSpy).toHaveBeenCalled();
    expect(cachesDeleteSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
