import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export type InfoGroup = {
  name: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<number | null>;
};

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent {
  info = input.required<FormGroup<InfoGroup>>();
}
