import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ValueAccessorDirective } from '@core/directives';
import { FileToObjectUrlPipe } from '@core/pipes';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  standalone: true,
  imports: [NgIf, AsyncPipe, FileToObjectUrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [ValueAccessorDirective],
})
export class AppFileInputComponent {
  private accessor = inject<ValueAccessorDirective<File>>(
    ValueAccessorDirective
  );

  public image = this.accessor.value$;

  public onChange(e: Event): void {
    const { files } = <HTMLInputElement>e.target;
    if (files?.length) {
      this.accessor.change(files[0]);
    }
  }
}
