import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFormControlComponent {
  @Input()
  public label!: string;

  @Input()
  public error!: string;

  @Input()
  public invalid!: boolean;
}
