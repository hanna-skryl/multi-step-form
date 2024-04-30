import { computed, Injectable, signal } from '@angular/core';
import { AddOn } from './components/add-ons/add-ons.component';
import { FREQUENCY, Frequency, Plan } from './components/plan/plan.component';

@Injectable({ providedIn: 'root' })
export class MultiStepFormStore {
  #state = signal({
    plan: null,
    frequency: FREQUENCY.monthly,
    addOns: [],
  });

  readonly selectedPlan = computed<Plan | null>(() => this.#state().plan);
  readonly selectedFrequency = computed<Frequency>(() => this.#state().frequency);
  readonly selectedAddOns = computed<AddOn[]>(() => this.#state().addOns);
}
