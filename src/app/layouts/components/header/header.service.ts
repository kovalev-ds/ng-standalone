import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderPortalService {
  private _component$ = new BehaviorSubject<ComponentPortal<unknown> | null>(
    null
  );

  public get component$(): Observable<ComponentPortal<unknown> | null> {
    return this._component$.asObservable();
  }

  public setComponent(
    component: ComponentType<unknown>,
    parentInjector: Injector | null = null
  ): void {
    this._component$.next(new ComponentPortal(component, null, parentInjector));
  }

  public clearPortalComponent(): void {
    this._component$.next(null);
  }
}
