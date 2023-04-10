import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AppButtonComponent } from '@components/button';
import { AppIconComponent } from '@components/icon';
import { AppRouteEnum } from '@core/enums/app-route.enum';
import { AuthUserInterface } from '@features/auth';
import { HeaderPortalService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterLink,
    MatMenuModule,
    AppIconComponent,
    AppButtonComponent,

    PortalModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly portalService = inject(HeaderPortalService);

  @Input()
  public user!: AuthUserInterface | null;

  @Output()
  public signout = new EventEmitter<void>();

  public appRoute: typeof AppRouteEnum = AppRouteEnum;

  public portalComponent$ = this.portalService.component$;

  public onSignOut() {
    this.signout.emit();
  }
}
