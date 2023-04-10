import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppIconComponent } from '@components/icon';

import { CreateDialogComponent } from '@features/warehouse/components';

@Component({
  standalone: true,
  selector: 'app-portal-content',
  imports: [AppIconComponent],
  templateUrl: './header-portal-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderPortalContentComponent {
  private readonly dialog = inject(MatDialog);

  public add(): void {
    this.dialog.open(CreateDialogComponent);
  }
}
