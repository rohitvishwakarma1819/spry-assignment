import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  RouterModule,
  withComponentInputBinding,
} from '@angular/router';

import { routes } from './app.routes';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(
      ReactiveFormsModule,
      MatDialogModule,
      CommonModule,
      RouterModule
    ),
    importProvidersFrom(FormBuilder),
  ],
};
