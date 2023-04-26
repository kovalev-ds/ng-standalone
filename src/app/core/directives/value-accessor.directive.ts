import { Directive, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

@Directive({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueAccessorDirective),
      multi: true,
    },
  ],
})
export class ValueAccessorDirective<T>
  implements ControlValueAccessor, OnDestroy
{
  private onChange!: (value: T) => void;
  private onTouched!: (isTouched: boolean) => void;

  private _value$ = new ReplaySubject<T>();
  private _disabled$ = new ReplaySubject<boolean>();

  public readonly value$ = this._value$.asObservable();
  public readonly disabled$ = this._disabled$.asObservable();

  ngOnDestroy(): void {
    this._value$.complete();
    this._disabled$.complete();
  }

  public change(v: T) {
    this.onChange(v);
    this._value$.next(v);
  }

  public touched(v: boolean) {
    this.onTouched(v);
  }

  writeValue(v: T): void {
    this._value$.next(v);
  }

  registerOnChange(fn: (v: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (v: boolean) => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled$.next(isDisabled);
  }
}
