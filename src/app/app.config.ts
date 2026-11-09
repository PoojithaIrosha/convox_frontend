import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiUrlInterceptor } from './interceptors/api-url.interceptor';
import { AppConfigService } from './services/app-config.service';
import { bearerTokenInterceptor } from './interceptors/bearer-token.interceptor';
import { authConfig } from './auth/auth.config';
import { OidcSecurityService, provideAuth } from 'angular-auth-oidc-client';
import { firstValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([apiUrlInterceptor, bearerTokenInterceptor])),
    provideAppInitializer(() => inject(AppConfigService).load()),
    provideRouter(routes),
    provideClientHydration(),
    provideAuth(authConfig),
    provideAppInitializer(() => {
      const oidc = inject(OidcSecurityService);
      return firstValueFrom(oidc.checkAuth());
    }),
  ],
};
