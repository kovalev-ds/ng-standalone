import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderPortalService } from 'src/app/layouts';
import { HeaderPortalContentComponent } from './header-portal-content';
import { WarehouseService } from '@features/warehouse';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe, NgFor, RouterLink],
  templateUrl: './warehouse-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehouseListComponent {
  private readonly headerPortal = inject(HeaderPortalService);
  private readonly warehouseService = inject(WarehouseService);

  public items$ = this.warehouseService.getWarehouseList();

  ngOnInit(): void {
    this.headerPortal.setComponent(HeaderPortalContentComponent);
    this.warehouseService.loadWarehouseList();
  }

  ngOnDestroy(): void {
    this.headerPortal.clearPortalComponent();
  }

  public trackById(idx: number, item: { id: number }): number {
    return item?.id ?? idx;
  }
}
