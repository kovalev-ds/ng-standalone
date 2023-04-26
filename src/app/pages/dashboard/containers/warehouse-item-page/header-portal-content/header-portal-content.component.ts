import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { map, takeWhile } from 'rxjs';

import { AppIconComponent } from '@components/icon';
import { AppIconButtonComponent } from '@components/icon-button';

import { CellService, CreateDialogComponent } from '@features/cell';
import { WarehouseService } from '@features/warehouse';
import { AccessControlDirective } from '@features/auth';

import { RemoveDialogComponent } from '../../../components/remove-dialog';

@Component({
  templateUrl: './header-portal-content.component.html',
  imports: [
    RouterLink,
    AppIconComponent,
    AppIconButtonComponent,
    NgIf,
    AsyncPipe,
    AccessControlDirective,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderPortalContentComponent {
  private readonly dialog = inject(MatDialog);

  protected readonly warehouseService = inject(WarehouseService);
  protected readonly cellService = inject(CellService);

  public add(): void {
    const matDialogRef = this.dialog.open(CreateDialogComponent, {
      position: { top: '200px' },
      minWidth: '456px',
    });

    matDialogRef
      .afterClosed()
      .pipe(takeWhile((x) => x))
      .subscribe((data) => {
        this.cellService.create(data);
      });
  }

  public remove(): void {
    const matDialogRef = this.dialog.open(RemoveDialogComponent, {
      position: { top: '200px' },
      minWidth: '456px',
      data: this.warehouseService.item$.pipe(map((item) => item?.name)),
    });

    matDialogRef
      .afterClosed()
      .pipe(takeWhile((x) => x))
      .subscribe(() => {
        this.warehouseService.remove();
      });
  }
}
