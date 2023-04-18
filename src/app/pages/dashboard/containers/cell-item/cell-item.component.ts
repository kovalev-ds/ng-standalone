import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CellService } from '@features/cell';
import {
  CreateDialogComponent,
  ItemCardComponent,
  ItemService,
} from '@features/item';
import { Subject, takeUntil, takeWhile } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AppIconComponent } from '@components/icon';
import { AppIconButtonComponent } from '@components/icon-button';

@Component({
  templateUrl: './cell-item.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    JsonPipe,
    AppIconComponent,
    AppIconButtonComponent,
    ItemCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellItemComponent implements OnInit, OnDestroy {
  private readonly dialog = inject(MatDialog);
  private readonly activeRoute = inject(ActivatedRoute);

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
    const matDialogRef = this.dialog.open(CreateDialogComponent, {
      position: { top: '200px' },
    });

    matDialogRef
      .afterClosed()
      .pipe(takeWhile((x) => x))
      .subscribe((x) => {
        this.itemService.createOne(x);
      });
  }
}
