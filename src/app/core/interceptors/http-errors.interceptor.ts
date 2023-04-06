import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { EMPTY, catchError } from 'rxjs';

import { ToastService } from '@core/services/toast.service';

export const HttpErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return EMPTY;
      }
      toastService.show(error.error.message ?? error.statusText);
      return EMPTY;
    })
  );
};
