import { ChangeDetectionStrategy, Component, Input, model, OnInit } from '@angular/core';
import { AddOn } from '../add-ons/add-ons.component';
import { FREQUENCY, Frequency, Plan } from '../plan/plan.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent implements OnInit {
  @Input() summary?: any;
  @Input() addOns?: AddOn[];
  @Input() frequency?: Frequency;
  @Input() plan?: Plan | null;

  isYearly = false;
  planType = '';
  planPrice = 0;
  footer = '';
  totalPrice = 0;
  priceSuffix = '';
  addOnsPrice = 0;

  currentStep = model<number>();

  goBack(event: Event): void {
    this.currentStep.set(1);
  }

  ngOnInit(): void {
    this.#calculatePricing();
  }

  #calculatePricing(): void {
    this.isYearly = this.frequency === FREQUENCY.yearly;
    this.priceSuffix = this.isYearly ? '/yr' : '/mo';
    this.planType = `${this.plan?.name} (${this.frequency})`;
    this.planPrice = this.#getPlanPrice();
    this.footer = `Total (per ${this.isYearly ? 'year' : 'month'})`;
    this.addOnsPrice = this.#calculateAddOnsPrice();
    this.totalPrice = this.planPrice + this.addOnsPrice;
  }

  #getPlanPrice(): number {
    return (this.isYearly ? this.plan?.price.year : this.plan?.price.month) ?? 0;
  }

  #calculateAddOnsPrice(): number {
    return (
      this.addOns?.reduce((total, addOn) => {
        return total + (this.isYearly ? addOn.price.year : addOn.price.month);
      }, 0) ?? 0
    );
  }
}
