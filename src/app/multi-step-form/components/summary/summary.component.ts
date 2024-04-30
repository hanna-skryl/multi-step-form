import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { AddOn } from '../add-ons/add-ons.component';
import { FREQUENCY, Frequency, Plan } from '../plan/plan.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  addOns = input.required<AddOn[]>();
  frequency = input.required<Frequency>();
  plan = input.required<Plan | null>();

  private isYearly = computed(() => this.frequency() === FREQUENCY.yearly);

  priceSuffix = computed(() => (this.isYearly() ? '/yr' : '/mo'));
  footer = computed(() => `Total (per ${this.isYearly() ? 'year' : 'month'})`);
  planType = computed(() => `${this.plan()?.name} (${this.frequency()})`);
  planPrice = computed(() => (this.isYearly() ? this.plan()?.price.year : this.plan()?.price.month) ?? 0);
  totalPrice = computed(() => this.planPrice() + this.addOnsPrice());

  addOnsPrice = computed(() => {
    return (
      this.addOns().reduce((total, addOn) => {
        return total + (this.isYearly() ? addOn.price.year : addOn.price.month);
      }, 0) ?? 0
    );
  });

  formattedAddOns = computed(() => {
    return this.addOns().map(item => {
      return { title: item.title, price: this.isYearly() ? item.price.year : item.price.month };
    });
  });

  currentStep = model<number>();

  goBack(event: Event): void {
    this.currentStep.set(1);
  }
}
