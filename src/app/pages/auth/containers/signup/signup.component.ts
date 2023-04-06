import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BlobService } from '@core/services';
import { AuthService, rolesOptions } from '@features/auth';

import { TSignUpFormControls, TSignUpFormGroup, form } from './signup.form';
import { DEPS } from './signup.dependencies';

@Component({
  standalone: true,
  imports: DEPS,
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  private readonly authService = inject(AuthService);
  private readonly blobService = inject(BlobService);

  public roleOptions = rolesOptions;
  public form: TSignUpFormGroup = form;

  public isFieldInvalid(name: keyof TSignUpFormControls): boolean {
    return (
      this.form.controls[name].invalid &&
      (this.form.controls[name].dirty || this.form.controls[name].touched)
    );
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }

    const { avatar, ...values } = this.form.getRawValue();

    this.blobService.toBase64(avatar as File).subscribe((value) => {
      this.authService.signup({ ...values, avatar: value });
    });
  }
}
