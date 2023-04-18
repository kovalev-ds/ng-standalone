import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppIconComponent } from '@components/icon';
import { AppIconButtonComponent } from '@components/icon-button';
import { AppInputComponent } from '@components/input';
import { CreateDialogComponent, WarehouseService } from '@features/warehouse';
import { takeWhile } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-portal-content',
  imports: [AppIconComponent, AppIconButtonComponent, AppInputComponent],
  templateUrl: './header-portal-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderPortalContentComponent {
  private readonly dialog = inject(MatDialog);
  private readonly warehouseService = inject(WarehouseService);

  public add(): void {
    const matDialogRef = this.dialog.open(CreateDialogComponent, {
      position: { top: '200px' },
      minWidth: '456px',
    });

    matDialogRef
      .afterClosed()
      .pipe(takeWhile((x) => x))
      .subscribe((data) => {
        this.warehouseService.create(data);
      });
  }
}
