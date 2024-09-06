import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<h1 class="font-bold text-3xl underline">Test</h1>
    <router-outlet />`,
})
export class AppComponent {
  title = 'frontend';
}
