import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const shouldBeAuthenticated = (
  fn: (router: Router) => void
): CanActivateFn => {
  return () => {
    const service = inject(AuthService);
    const router = inject(Router);

    return service.isAuthenticated().pipe(
      tap((isAuthenticated) => {
        !isAuthenticated && fn(router);
      })
    );
  };
};
