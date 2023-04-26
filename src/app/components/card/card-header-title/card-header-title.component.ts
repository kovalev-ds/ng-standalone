import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-header-title',
  templateUrl: './card-header-title.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderTitleComponent {}
