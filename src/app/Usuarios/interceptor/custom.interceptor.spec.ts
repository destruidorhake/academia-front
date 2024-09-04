import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { customInterceptor } from './custom.interceptor';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('customInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useValue: customInterceptor,
          multi: true
        }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve adicionar o cabeçalho Authorization se o token estiver presente', () => {
    localStorage.setItem('authToken', 'test-token');

    httpClient.get('/test-url').subscribe(response => {
      // Lógica de asserção, se necessário
    });

    const req = httpTestingController.expectOne('/test-url');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush({}); // Responder à requisição
  });

  it('não deve adicionar o cabeçalho Authorization se o token não estiver presente', () => {
    localStorage.removeItem('authToken');

    httpClient.get('/test-url').subscribe(response => {
      // Lógica de asserção, se necessário
    });

    const req = httpTestingController.expectOne('/test-url');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({}); // Responder à requisição
  });
});
