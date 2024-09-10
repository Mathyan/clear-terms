import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './user.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, CommonModule],
  providers: [UserService],
  template: ` <app-top-bar [isUserLoggedIn]="isUserLoggiedIn"></app-top-bar>
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  isUserLoggiedIn = false;
  title = 'Clear Terms';
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.isUserLoggiedIn = !!user;
      },
      error: () => {
        this.isUserLoggiedIn = false;
      },
    });
  }
}
