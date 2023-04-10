import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
