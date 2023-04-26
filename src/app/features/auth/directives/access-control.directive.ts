import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

import { Subject, map, takeUntil } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { RoleEnum } from '../enums/role.enum';

@Directive({
  selector: '[access]',
  standalone: true,
})
export class AccessControlDirective implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly templateRef = inject(TemplateRef<HTMLElement>);

  @Input()
  public access!: keyof typeof RoleEnum;

  private destroyed$ = new Subject<boolean>();
  private isVisible = false;

  ngOnInit(): void {
    this.authService.user$
      .pipe(
        takeUntil(this.destroyed$),
        map((user) => user?.roles)
      )
      .subscribe((roles = []) => {
        if (!roles) {
          this.viewContainerRef.clear();
        }

        if (
          roles.includes(this.access.toLowerCase() as keyof typeof RoleEnum)
        ) {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        } else {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
