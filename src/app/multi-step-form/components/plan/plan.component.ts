import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, input, model, viewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Enum, InferValue } from 'better-enums';

export type Plan = { icon: string; name: string; price: { month: number; year: number } };

export type PlanGroup = {
  type: FormControl<string>;
  frequency: FormControl<boolean>;
};

const FREQUENCY_ENUM = Enum({ yearly: 'Yearly', monthly: 'Monthly' });
export type Frequency = InferValue<typeof FREQUENCY_ENUM>;
export const FREQUENCY = FREQUENCY_ENUM.accessor;

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanComponent {
  plan = input.required<FormGroup<PlanGroup>>();
  content = input.required<Plan[]>();

  selectedPlan = model<Plan | null>(null);
  selectedFrequency = model<Frequency>(FREQUENCY.monthly);

  readonly FREQUENCY = FREQUENCY_ENUM.accessor;

  updateSelectedFrequency(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.selectedFrequency.set(checkbox.checked ? FREQUENCY.yearly : FREQUENCY.monthly);
  }

  readonly inputRefs = viewChildren<ElementRef>('inputRef');

  #focusFirstInput(): void {
    if (this.inputRefs() && this.inputRefs().length > 0) {
      this.inputRefs()[0].nativeElement.focus();
      this.inputRefs()[0].nativeElement.click();
    }
  }

  ngAfterViewInit() {
    this.#focusFirstInput();
  }
}
