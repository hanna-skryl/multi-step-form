import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./multi-step-form/multi-step-form.component').then(c => c.MultiStepFormComponent),
    title: 'Multi-Step Form',
  },
];
