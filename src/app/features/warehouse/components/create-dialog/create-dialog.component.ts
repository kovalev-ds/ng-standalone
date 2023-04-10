import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppCardComponent } from '@components/card';
import { AppInputComponent } from '@components/input';

@Component({
  templateUrl: './create-dialog.component.html',
  standalone: true,
  imports: [AppCardComponent, AppInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDialogComponent {}
