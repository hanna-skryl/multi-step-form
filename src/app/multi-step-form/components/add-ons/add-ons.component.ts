import { ChangeDetectionStrategy, Component, computed, ElementRef, input, model, viewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FREQUENCY, Frequency } from '../plan/plan.component';

export type AddOn = {
  title: string;
  subtitle: string;
  price: { month: number; year: number };
};

export type AddOnsGroup = {
  items: FormArray<FormControl<boolean>>;
};

@Component({
  selector: 'app-add-ons',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-ons.component.html',
  styleUrl: './add-ons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOnsComponent {
  addOns = input.required<FormGroup<AddOnsGroup>>();
  content = input.required<AddOn[]>();
  frequency = input.required<Frequency>();

  selectedAddOns = model<AddOn[]>([]);

  isMonthlySubscription = computed(() => this.frequency() === FREQUENCY.monthly);

  updateSelection(addOn: AddOn) {
    if (!this.selectedAddOns().includes(addOn)) {
      this.selectedAddOns.update(items => {
        return [...items, addOn];
      });
    } else {
      this.selectedAddOns.update(items => {
        return items.filter(item => item.title !== addOn.title);
      });
    }
  }

  readonly inputRefs = viewChildren<ElementRef>('inputRef');

  #focusFirstInput() {
    if (this.inputRefs() && this.inputRefs().length > 0) {
      this.inputRefs()[0].nativeElement.focus();
    }
  }

  ngAfterViewInit() {
    this.#focusFirstInput();
  }
}
