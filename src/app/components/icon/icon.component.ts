import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  imports: [MatIconModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIconComponent {
  @HostBinding('class')
  get classes() {
    return 'h-6 w-6';
  }
}
