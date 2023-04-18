import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

import { LoaderService } from '@core/services';

export const globalLoaderInterceptor = (): HttpInterceptorFn => {
  return (req, next) => {
    const service = inject(LoaderService);
    service.start();
    return next(req).pipe(finalize(() => service.finish()));
  };
};
