import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIconButtonComponent {}
