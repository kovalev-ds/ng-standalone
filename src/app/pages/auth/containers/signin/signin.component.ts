import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AuthService } from '@features/auth';

import { TSignInFormControls, TSignInFormGroup, form } from './signin.form';
import { DEPS } from './signin.dependencies';

@Component({
  standalone: true,
  imports: DEPS,
  templateUrl: './signin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  private readonly authService = inject(AuthService);

  public form: TSignInFormGroup = form;

  public isFieldInvalid(name: keyof TSignInFormControls): boolean {
    return this.form.dirty && this.form.controls[name].invalid;
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.getRawValue();
    this.authService.signin({ email, password });
  }
}
