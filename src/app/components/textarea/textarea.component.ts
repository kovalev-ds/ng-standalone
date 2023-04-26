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

  public value$ = this.accessor.value$;

  // constructor() {
  //   this.accessor.value$.subscribe((value) => {
  //     this.value = value;
  //   });
  // }

  public onChange(value: string) {
    this.accessor.change(value);
  }
}
