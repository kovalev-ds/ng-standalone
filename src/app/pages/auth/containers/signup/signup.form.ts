import { FormGroup, FormControl, Validators } from '@angular/forms';

export type TSignUpFormControls = {
  email: FormControl<string>;
  password: FormControl<string>;
  username: FormControl<string>;
  avatar: FormControl<File | null>;
  role: FormControl<string>;
};
export type TSignUpFormGroup = FormGroup<TSignUpFormControls>;

export const form: TSignUpFormGroup = new FormGroup({
  email: new FormControl('', {
    validators: [Validators.required, Validators.email],
    nonNullable: true,
  }),
  password: new FormControl('', {
    validators: [Validators.required, Validators.minLength(4)],
    nonNullable: true,
  }),
  username: new FormControl('', {
    validators: [Validators.required],
    nonNullable: true,
  }),
  avatar: new FormControl<File | null>(null, {
    validators: [Validators.required],
  }),
  role: new FormControl('', {
    validators: [Validators.required],
    nonNullable: true,
  }),
});
