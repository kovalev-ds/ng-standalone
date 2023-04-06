import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { EMPTY, catchError } from 'rxjs';

export const AuthInterceptor =
  (fn: () => void): HttpInterceptorFn =>
  (req, next) => {
    req = req.clone({ withCredentials: true });

    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          fn();
        }
        return EMPTY;
      })
    );
  };
