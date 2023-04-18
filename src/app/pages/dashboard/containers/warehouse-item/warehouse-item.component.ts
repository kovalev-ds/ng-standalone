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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehouseItemComponent implements OnInit, OnDestroy {
  private readonly headerPortal = inject(HeaderPortalService);
  private readonly activeRoute = inject(ActivatedRoute);

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
}
