import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ValueAccessorDirective } from '@core/directives';
import { FileToObjectUrlPipe } from '@core/pipes';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  standalone: true,
  imports: [NgIf, FileToObjectUrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [ValueAccessorDirective],
})
export class AppFileInputComponent {
  private accessor = inject<ValueAccessorDirective<File>>(
    ValueAccessorDirective
  );

  public image?: File;

  public onChange(e: Event) {
    const { files } = <HTMLInputElement>e.target;
    if (files?.length) {
      this.image = files[0];
      this.accessor.change(files[0]);
    }
  }
}
