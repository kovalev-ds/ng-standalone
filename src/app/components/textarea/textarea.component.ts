import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { ValueAccessorDirective } from '@core/directives';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  standalone: true,
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [ValueAccessorDirective],
})
export class AppTextareaComponent {
  private accessor = inject<ValueAccessorDirective<string>>(
    ValueAccessorDirective
  );

  @Input() public placeholder!: string;

  public get value$() {
    return this.accessor.value$;
  }

  public onChange(value: string) {
    this.accessor.change(value);
  }
}
