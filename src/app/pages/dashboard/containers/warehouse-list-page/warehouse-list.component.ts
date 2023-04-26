import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { LoaderService } from '@core/services';
import { WarehouseService } from '@features/warehouse';

import { HeaderPortalContentComponent } from './header-portal-content';
import { HeaderPortalService } from 'src/app/layouts';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe, NgFor, RouterLink],
  templateUrl: './warehouse-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehouseListComponent {
  private readonly headerPortal = inject(HeaderPortalService);
  protected readonly warehouseService = inject(WarehouseService);
  protected readonly loaderService = inject(LoaderService);

  ngOnInit(): void {
    this.headerPortal.setComponent(HeaderPortalContentComponent);
    this.warehouseService.loadList();
  }

  ngOnDestroy(): void {
    this.headerPortal.clearPortalComponent();
  }

  public trackById(idx: number, item: { id: number }): number {
    return item?.id ?? idx;
  }
}
