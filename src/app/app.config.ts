import { ApplicationConfig } from '@angular/core';
import { routes } from './app.routes';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
    ),
  ],
};
