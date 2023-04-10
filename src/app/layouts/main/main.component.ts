import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppButtonComponent } from '@components/button';
import { AuthService } from '@features/auth';
import { MatMenuModule } from '@angular/material/menu';
import { AppIconComponent } from '@components/icon';
import { HeaderComponent } from '../components';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    NgIf,
    MatMenuModule,

    AppButtonComponent,
    AppIconComponent,

    HeaderComponent,
  ],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  private readonly authService = inject(AuthService);

  public user$ = this.authService.user$;

  public signout(): void {
    this.authService.signout();
  }
}
