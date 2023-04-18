import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { ToastService } from '@core/services/toast.service';

const exceptions = [401, 403];

export const httpErrorsInterceptor = (): HttpInterceptorFn => (req, next) => {
  const toastService = inject(ToastService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (!exceptions.includes(error.status)) {
        toastService.show(error.error.message ?? error.statusText);
      }
      return throwError(() => error);
    })
  );
};
