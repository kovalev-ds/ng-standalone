import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { ValueAccessorDirective } from '@core/directives';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  standalone: true,
  imports: [AsyncPipe, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [ValueAccessorDirective],
})
export class AppSelectComponent {
  private readonly accessor = inject<ValueAccessorDirective<string>>(
    ValueAccessorDirective
  );

  @Input()
  public options!: Array<{ name: string; value: string }>;

  public onChange(value: string) {
    this.accessor.change(value);
  }
}
