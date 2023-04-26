import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, concatMap, concatWith, takeUntil } from 'rxjs';

import { BlobService } from '@core/services';
import { ItemInterface } from '@features/item/interfaces';

import { AppButtonComponent } from '@components/button';
import { AppCardComponent } from '@components/card';
import { AppFileInputComponent } from '@components/file-input';
import { AppFormControlComponent } from '@components/form-control';
import { AppInputComponent } from '@components/input';
import { AppTextareaComponent } from '@components/textarea';

@Component({
  templateUrl: './form-dialog.component.html',
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
export class FormDialogComponent {
  private readonly blobService = inject(BlobService);
  private readonly dialogRef = inject(MatDialogRef<FormDialogComponent>);
  private readonly dialogData$ =
    inject<Observable<ItemInterface>>(MAT_DIALOG_DATA);

  private destroy$ = new Subject<boolean>();

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

  ngOnInit(): void {
    this.dialogData$?.pipe(takeUntil(this.destroy$)).subscribe(async (item) => {
      this.form.patchValue({
        name: item.name,
        description: item.description,
        total: item.total,
        image: await this.blobService.toFile(item.image, 'item.name'),
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

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
