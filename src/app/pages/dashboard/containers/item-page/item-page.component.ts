import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { takeWhile } from 'rxjs';

import { LoaderService } from '@core/services';
import { FormDialogComponent, ItemService } from '@features/item';
import { AccessControlDirective } from '@features/auth';
import { AppIconButtonComponent } from '@components/icon-button';
import { AppIconComponent } from '@components/icon';

@Component({
  templateUrl: './item-page.component.html',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    AppIconButtonComponent,
    AppIconComponent,
    AccessControlDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemPageComponent {
  private readonly dialog = inject(MatDialog);
  private readonly activeRoute = inject(ActivatedRoute);

  protected readonly loaderService = inject(LoaderService);
  protected readonly itemService = inject(ItemService);

  ngOnInit(): void {
    this.itemService.loadById(this.activeRoute.snapshot.params['id']);
  }

  public edit() {
    const matDialogRef = this.dialog.open(FormDialogComponent, {
      position: { top: '100px' },
      data: this.itemService.selected$,
    });

    matDialogRef
      .afterClosed()
      .pipe(takeWhile((x) => x))
      .subscribe((x) => {
        this.itemService.updateOne(x);
      });
  }
}
