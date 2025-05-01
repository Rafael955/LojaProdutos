import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { registerLocaleData } from '@angular/common';

import ptBR from '@angular/common/locales/pt';

registerLocaleData(ptBR);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(
      //registrando o interceptor
      withInterceptors([TokenInterceptor])
    ),
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ]
};
