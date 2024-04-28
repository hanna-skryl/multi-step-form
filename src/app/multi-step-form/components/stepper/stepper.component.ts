import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [],
  template: `
    <aside class="steps">
      @for (step of steps(); track step.title; let i = $index) {
        <section class="step" [class.active]="i === currentStep()">
          <div class="step-index">{{ i + 1 }}</div>
          <div class="step-info">
            <div class="step-label">Step {{ i + 1 }}</div>
            <div class="step-title">{{ step.title }}</div>
          </div>
        </section>
      }
    </aside>
  `,
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  steps = input.required<{ title: string }[]>();
  currentStep = model.required<number>();
}
