import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { tap, map, skipWhile } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const shouldBeAuthenticated = (
  fn: (router: Router) => void
): CanMatchFn => {
  return () => {
    const service = inject(AuthService);
    const router = inject(Router);

    return service.isAuthenticated$.pipe(
      skipWhile((authenticated) => authenticated === null),
      map((authenticated) => authenticated as boolean),
      tap((authenticated) => {
        !authenticated && fn(router);
      })
    );
  };
};
