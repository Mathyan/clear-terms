import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './user.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, CommonModule],
  providers: [UserService],
  template: ` <app-top-bar />
    <router-outlet />`,
})
export class AppComponent {
  title = 'Clear Terms';
}
