import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppButtonComponent } from '@components/button';
import { AuthService } from '@features/auth';
import { MatMenuModule } from '@angular/material/menu';
import { AppIconComponent } from '@components/icon';
import { AppRouteEnum } from '@core/enums/app-route.enum';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    NgIf,
    AppButtonComponent,
    MatMenuModule,
    AppIconComponent,
  ],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  public authService = inject(AuthService);
  public appRoute: typeof AppRouteEnum = AppRouteEnum;

  public user$ = this.authService.user$;

  public signout() {
    this.authService.signout();
  }
}
