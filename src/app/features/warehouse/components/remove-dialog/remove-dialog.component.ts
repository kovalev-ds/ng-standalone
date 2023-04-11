import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppConfirmDialogComponent } from '@components/confirm-dialog';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './remove-dialog.component.html',
  standalone: true,
  imports: [AppConfirmDialogComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<RemoveDialogComponent>);
  public readonly name = inject<Observable<string>>(MAT_DIALOG_DATA);

  public confirm(): void {
    this.dialogRef.close(true);
  }

  public reject(): void {
    this.dialogRef.close(false);
  }
}
