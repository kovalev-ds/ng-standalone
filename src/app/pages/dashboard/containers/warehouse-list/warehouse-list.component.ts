import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderPortalService } from 'src/app/layouts';
import { HeaderPortalContentComponent } from './header-portal-content';

@Component({
  standalone: true,
  templateUrl: './warehouse-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehouseListComponent {
  private readonly headerPortal = inject(HeaderPortalService);

  ngOnInit(): void {
    this.headerPortal.setComponent(HeaderPortalContentComponent);
  }

  ngOnDestroy(): void {
    this.headerPortal.clearPortalComponent();
  }
}
