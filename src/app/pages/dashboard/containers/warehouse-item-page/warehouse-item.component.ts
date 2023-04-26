import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { HeaderPortalService } from 'src/app/layouts';
import { HeaderPortalContentComponent } from './header-portal-content';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { WarehouseService } from '@features/warehouse';
import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { CellService } from '@features/cell';
import { LoaderService } from '@core/services';
import { AppIconButtonComponent } from '@components/icon-button';
import { AppIconComponent } from '@components/icon';
import { MatDialog } from '@angular/material/dialog';
import { RemoveDialogComponent } from 'src/app/pages/dashboard/components/remove-dialog/remove-dialog.component';
import { map, takeWhile } from 'rxjs';

@Component({
  templateUrl: './warehouse-item.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    NgIf,
    NgFor,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgClass,
    AppIconButtonComponent,
    AppIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehouseItemComponent implements OnInit, OnDestroy {
  private readonly headerPortal = inject(HeaderPortalService);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);

  protected readonly loaderService = inject(LoaderService);
  protected readonly warehouseService = inject(WarehouseService);
  protected readonly cellService = inject(CellService);

  ngOnInit(): void {
    this.headerPortal.setComponent(HeaderPortalContentComponent);
    this.warehouseService.loadOne(this.activeRoute.snapshot.params['id']);
  }

  ngOnDestroy(): void {
    this.headerPortal.clearPortalComponent();
  }

  public selectCell(id: number): void {
    this.cellService.loadOne(id);
  }

  public remove(id: number): void {
    const matDialogRef = this.dialog.open(RemoveDialogComponent, {
      position: { top: '200px' },
      minWidth: '456px',
      data: this.cellService.items$.pipe(
        map((items) => items.find((item) => item.id === id)?.name)
      ),
    });

    matDialogRef
      .afterClosed()
      .pipe(takeWhile((x) => x))
      .subscribe(() => {
        this.cellService.remove(id);
      });
  }
}
