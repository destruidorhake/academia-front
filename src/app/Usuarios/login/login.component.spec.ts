import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from '../Authentication/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule, FormsModule, HttpClientTestingModule],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método onLogin e redirecionar para /search em caso de sucesso', () => {
    spyOn(authService, 'login').and.returnValue(of(true));
    spyOn(component['router'], 'navigate');

    component.email = 'test@example.com';
    component.password = 'password';
    component.onLogin();

    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(component['router'].navigate).toHaveBeenCalledWith(['/search']);
  });

  it('deve definir mensagens de erro em caso de falha no login', () => {
    spyOn(authService, 'login').and.returnValue(of(false));

    component.email = 'test@example.com';
    component.password = 'password';
    component.onLogin();

    expect(component.infoMessage).toBe('Login falhou. Verifique suas credenciais!');
    expect(component.loginError).toBeTrue();
  });

  it('deve limpar mensagens após um atraso', (done) => {
    spyOn(authService, 'login').and.returnValue(of(false));

    component.email = 'test@example.com';
    component.password = 'password';
    component.onLogin();

    setTimeout(() => {
      expect(component.errorMessage).toBe('');
      expect(component.infoMessage).toBe('');
      done();
    }, 5000);
  });
});
