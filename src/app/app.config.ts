import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { AlunosService } from './Services/Alunos.Service/alunos.service';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from './Usuarios/Authentication/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthService,
    AlunosService,
    CommonModule,
    MatSnackBar,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    NgxMaskDirective,
    NgxMaskPipe,
    provideNgxMask(),
    provideHttpClient(withFetch()),
    importProvidersFrom(BrowserModule, MatTableModule, MatButtonModule, MatSelectModule, BrowserAnimationsModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideRouter(routes),
  ]
};
