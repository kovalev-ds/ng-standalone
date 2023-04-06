import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppButtonComponent } from '@components/button';
import { AppCardComponent } from '@components/card';
import { AppFileInputComponent } from '@components/file-input';
import { AppFormControlComponent } from '@components/form-control';
import { AppIconComponent } from '@components/icon';
import { AppInputComponent } from '@components/input';
import { AppSelectComponent } from '@components/select';

export const DEPS = [
  AppCardComponent,
  AppIconComponent,
  AppButtonComponent,
  AppFileInputComponent,
  AppFormControlComponent,
  AppInputComponent,
  AppSelectComponent,

  RouterLink,
  ReactiveFormsModule,
];
