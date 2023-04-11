import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { AppButtonComponent } from '@components/button';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm-dialog.component.html',
  standalone: true,
  imports: [AppButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppConfirmDialogComponent {
  @Output()
  private confirmed = new EventEmitter<void>();

  @Output()
  private rejected = new EventEmitter<void>();

  public confirm(): void {
    this.confirmed.emit();
  }

  public reject(): void {
    this.rejected.emit();
  }
}
