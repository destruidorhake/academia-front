import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { AlunosService } from './Services/Alunos.Service/alunos.service';

const serverConfig: ApplicationConfig = {
  providers: [
    AlunosService,
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
