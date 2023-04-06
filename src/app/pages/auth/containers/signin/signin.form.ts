import { FormGroup, FormControl, Validators } from '@angular/forms';

export type TSignInFormControls = {
  email: FormControl<string>;
  password: FormControl<string>;
};
export type TSignInFormGroup = FormGroup<TSignInFormControls>;

export const form: TSignInFormGroup = new FormGroup({
  email: new FormControl('', {
    validators: [Validators.required, Validators.email],
    nonNullable: true,
  }),
  password: new FormControl('', {
    validators: [Validators.required],
    nonNullable: true,
  }),
});
