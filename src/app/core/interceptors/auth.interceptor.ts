import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authenticationInterceptor =
  (fn: () => void): HttpInterceptorFn =>
  (req, next) => {
    req = req.clone({ withCredentials: true });

    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          fn();
        }
        return throwError(() => error);
      })
    );
  };
