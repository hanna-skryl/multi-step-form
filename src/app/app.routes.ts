import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'multi-step-form',
    pathMatch: 'full',
  },
  {
    path: 'multi-step-form',
    loadComponent: () => import('./multi-step-form/multi-step-form.component').then(c => c.MultiStepFormComponent),
    title: 'Multi-Step Form',
  },
];
