import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppButtonComponent } from '@components/button';
import { AppInputComponent } from '@components/input';

@Component({
  templateUrl: './create-dialog.component.html',
  standalone: true,
  imports: [AppInputComponent, AppButtonComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDialogComponent {
  public readonly dialogRef = inject(MatDialogRef<CreateDialogComponent>);

  public readonly form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(this.form.value);
  }
}
