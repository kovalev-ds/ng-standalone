import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AppButtonComponent } from '@components/button';
import { AppCardComponent } from '@components/card';
import { AppFormControlComponent } from '@components/form-control';
import { AppIconComponent } from '@components/icon';
import { AppInputComponent } from '@components/input';

export const DEPS = [
  AppCardComponent,
  AppIconComponent,
  AppButtonComponent,
  AppFormControlComponent,
  AppInputComponent,

  RouterLink,
  ReactiveFormsModule,
];
