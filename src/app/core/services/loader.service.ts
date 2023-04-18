import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { isBusy, loadingFinish, loadingStart } from '@store/loader';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private readonly store = inject(Store);

  public readonly isBusy$ = this.store.select(isBusy);
  public readonly isReady$ = this.store.select(isBusy).pipe(map((x) => !x));

  public start(): void {
    this.store.dispatch(loadingStart());
  }

  public finish(): void {
    this.store.dispatch(loadingFinish());
  }
}
