import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ItemInterface } from '@features/item/interfaces';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCardComponent {
  @Input()
  public item!: ItemInterface;
}
