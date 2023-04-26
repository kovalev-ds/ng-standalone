import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Subject, takeUntil, takeWhile } from 'rxjs';

import { LoaderService } from '@core/services';
import { AppIconComponent } from '@components/icon';
import { AppIconButtonComponent } from '@components/icon-button';
import { AccessControlDirective } from '@features/auth';
import { CellService } from '@features/cell';
import {
  FormDialogComponent,
  ItemCardComponent,
  ItemService,
} from '@features/item';

@Component({
  templateUrl: './cell-page.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    RouterLink,
    AppIconComponent,
    AppIconButtonComponent,
    ItemCardComponent,
    AccessControlDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellPageComponent implements OnInit, OnDestroy {
  private readonly dialog = inject(MatDialog);
  private readonly activeRoute = inject(ActivatedRoute);

  protected readonly loaderService = inject(LoaderService);
  protected readonly cellService = inject(CellService);
  protected readonly itemService = inject(ItemService);

  private readonly destroy$ = new Subject<boolean>();

  ngOnInit() {
    this.activeRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ id }) => {
        this.cellService.loadOne(id);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public add(): void {
    const matDialogRef = this.dialog.open(FormDialogComponent, {
      position: { top: '100px' },
    });

    matDialogRef
      .afterClosed()
      .pipe(takeWhile((x) => x))
      .subscribe((x) => {
        this.itemService.createOne(x);
      });
  }

  public trackById(idx: number, item: { id: number }): number {
    return item?.id ?? idx;
  }
}
