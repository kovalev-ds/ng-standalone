import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { AppIconComponent } from '@components/icon';
import { AppIconButtonComponent } from '@components/icon-button';
import { WarehouseService } from '@features/warehouse';
import { RemoveDialogComponent } from '@features/warehouse/components/remove-dialog/remove-dialog.component';
import { map, takeWhile } from 'rxjs';

@Component({
  templateUrl: './header-portal-content.component.html',
  imports: [RouterLink, AppIconComponent, AppIconButtonComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderPortalContentComponent {
  private readonly dialog = inject(MatDialog);
  private readonly warehouseService = inject(WarehouseService);

  public add(): void {}

  public remove(): void {
    const matDialogRef = this.dialog.open(RemoveDialogComponent, {
      position: { top: '200px' },
      minWidth: '456px',
      data: this.warehouseService.warehouse$.pipe(map((item) => item?.name)),
    });

    matDialogRef
      .afterClosed()
      .pipe(takeWhile((x) => x))
      .subscribe(() => {
        this.warehouseService.removeWarehouse();
      });
  }
}
