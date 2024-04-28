import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, input, viewChild } from '@angular/core';
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
export class InfoComponent implements AfterViewInit {
  readonly firstInput = viewChild<ElementRef>('firstInput');

  ngAfterViewInit() {
    this.firstInput()?.nativeElement.focus();
  }

  info = input.required<FormGroup<InfoGroup>>();
}
