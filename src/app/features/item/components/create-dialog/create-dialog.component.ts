import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppButtonComponent } from '@components/button';
import { AppCardComponent } from '@components/card';
import { AppFileInputComponent } from '@components/file-input';
import { AppFormControlComponent } from '@components/form-control';
import { AppInputComponent } from '@components/input';
import { AppTextareaComponent } from '@components/textarea';
import { BlobService } from '@core/services';

@Component({
  templateUrl: './create-dialog.component.html',
  standalone: true,
  imports: [
    AppInputComponent,
    AppButtonComponent,
    ReactiveFormsModule,
    AppFileInputComponent,
    AppTextareaComponent,
    AppFormControlComponent,
    AppCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<CreateDialogComponent>);
  private readonly blobService = inject(BlobService);

  public readonly form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    total: new FormControl(0, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    image: new FormControl<File | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const { image, ...values } = this.form.getRawValue();

    this.blobService.toBase64(image as File).subscribe((base64) => {
      this.dialogRef.close({ ...values, image: base64 });
    });
  }
}
