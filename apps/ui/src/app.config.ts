import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {errorInterceptor} from '@/shared/interceptors/error-interceptor'
import {httpInterceptor} from '@/shared/interceptors/http-interceptor'
import { provideNgxMask } from 'ngx-mask';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([httpInterceptor,errorInterceptor])),
    provideRouter(appRoutes),
    provideNgxMask()
  ],
};
