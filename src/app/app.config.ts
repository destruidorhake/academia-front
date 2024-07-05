import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { AlunosService } from './Services/alunos.service';
import { AuthService } from './Authentication/auth.service';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthService,
    AlunosService,
    provideHttpClient(),
    importProvidersFrom(BrowserModule, MatTableModule, MatButtonModule),
    provideEnvironmentNgxMask(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideRouter(routes),
  ]
};
