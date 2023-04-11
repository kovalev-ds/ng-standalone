import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VariantEnum, variants } from './button.variants';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppButtonComponent {
  @Input()
  public type: 'button' | 'submit' = 'button';

  @Input()
  public disabled: boolean = false;

  @Input()
  public variant: keyof typeof VariantEnum = 'dark';

  public get classes() {
    return variants.get(this.variant);
  }
}
