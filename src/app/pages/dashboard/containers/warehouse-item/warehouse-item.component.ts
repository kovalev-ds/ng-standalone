import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { HeaderPortalService } from 'src/app/layouts';
import { HeaderPortalContentComponent } from './header-portal-content';
import { ActivatedRoute } from '@angular/router';
import { WarehouseService } from '@features/warehouse';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  templateUrl: './warehouse-item.component.html',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehouseItemComponent implements OnInit, OnDestroy {
  private readonly headerPortal = inject(HeaderPortalService);
  private readonly activeRoute = inject(ActivatedRoute);
  protected readonly warehouseService = inject(WarehouseService);

  ngOnInit(): void {
    this.headerPortal.setComponent(HeaderPortalContentComponent);
    this.warehouseService.loadWarehouse(this.activeRoute.snapshot.params['id']);
  }
  ngOnDestroy(): void {
    this.headerPortal.clearPortalComponent();
  }
}
