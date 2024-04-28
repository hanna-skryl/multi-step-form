import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InfoGroup, InfoComponent } from './components/info/info.component';
import { PlanComponent, Plan, PlanGroup, Frequency, FREQUENCY } from './components/plan/plan.component';
import { AddOn, AddOnsComponent, AddOnsGroup } from './components/add-ons/add-ons.component';
import { SummaryComponent } from './components/summary/summary.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

type MultiStepForm = {
  info: FormGroup<InfoGroup>;
  plan: FormGroup<PlanGroup>;
  addOns: FormGroup<AddOnsGroup>;
};

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.scss',
  imports: [
    InfoComponent,
    PlanComponent,
    AddOnsComponent,
    StepperComponent,
    SummaryComponent,
    ReactiveFormsModule,
    ConfirmationComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiStepFormComponent {
  steps = [{ title: 'Your info' }, { title: 'Select plan' }, { title: 'Add-ons' }, { title: 'Summary' }];

  content = [
    {
      title: 'Personal info',
      subtitle: 'Please provide your name, email address, and phone number.',
    },
    {
      title: 'Select your plan',
      subtitle: 'You have the option of monthly or yearly billing.',
    },
    {
      title: 'Pick add-ons',
      subtitle: 'Add-ons help enhance your gaming experience.',
    },
    {
      title: 'Finishing up',
      subtitle: 'Double-check everything looks OK before confirming.',
    },
  ];

  plans: Plan[] = [
    { icon: './assets/images/icon-arcade.svg', name: 'Arcade', price: { month: 9, year: 90 } },
    { icon: './assets/images/icon-advanced.svg', name: 'Advanced', price: { month: 12, year: 120 } },
    { icon: './assets/images/icon-pro.svg', name: 'Pro', price: { month: 15, year: 150 } },
  ];

  addOns: AddOn[] = [
    { title: 'Online service', subtitle: 'Access to multiple games', price: { month: 1, year: 10 } },
    { title: 'Larger storage', subtitle: 'Extra 1TB of cloud safe', price: { month: 2, year: 20 } },
    {
      title: 'Customizable profile',
      subtitle: 'Custom theme on your profile',
      price: { month: 2, year: 20 },
    },
  ];

  selectedAddOns: AddOn[] = [];
  selectedFrequency: Frequency = FREQUENCY.monthly;
  selectedPlan: Plan | null = null;

  #fb = inject(FormBuilder);

  form = this.#fb.nonNullable.group<MultiStepForm>({
    info: this.#fb.group<InfoGroup>({
      name: this.#fb.nonNullable.control('', Validators.required),
      email: this.#fb.nonNullable.control('', {
        validators: [Validators.required, Validators.email],
      }),
      phone: this.#fb.nonNullable.control(null, Validators.required),
    }),

    plan: this.#fb.group<PlanGroup>({
      type: this.#fb.nonNullable.control('', Validators.required),
      frequency: this.#fb.nonNullable.control<boolean>(false, Validators.required),
    }),
    addOns: this.#fb.group<AddOnsGroup>({
      items: this.#fb.array(this.addOns.map(() => this.#fb.nonNullable.control<boolean>(false))),
    }),
  });

  currentStep = signal<number>(0);
  isSubmitted = signal<boolean>(false);

  currentGroup = computed<FormGroup>(() => {
    return this.#getGroupAt(this.currentStep());
  });

  #getGroupAt(index: number): FormGroup {
    const groups: FormGroup[] = Object.keys(this.form.controls).map(groupName =>
      this.form.get(groupName),
    ) as FormGroup[];
    return groups[index];
  }

  prev() {
    this.currentStep.update(i => i - 1);
  }
  next() {
    this.currentStep.update(i => i + 1);
  }
  submit() {
    this.isSubmitted.set(true);
  }
}
