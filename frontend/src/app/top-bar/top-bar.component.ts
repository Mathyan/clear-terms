import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterLink],
  providers: [UserService],
  template: `
    <div class="bg-indigo-600 p-4 flex items-center justify-between">
      <h1 class="text-white text-2xl">Clear Terms</h1>
      <nav class="flex space-x-4">
        <a routerLink="/" class="text-white text-lg hover:underline">Home</a>
        <a routerLink="/user" class="text-white text-lg hover:underline"
          >User</a
        >
        @if (!isUserLoggedIn) {
          <a routerLink="/login" class="text-white text-lg hover:underline"
            >Login</a
          >
        } @else {
          <button
            logout
            (click)="logout()"
            class="text-white text-lg hover:underline"
          >
            Logout
          </button>
        }
      </nav>
    </div>
  `,
})
export class TopBarComponent {
  @Input() isUserLoggedIn = false;
  constructor(private userService: UserService) {}
  logout() {
    this.userService.logout().subscribe({
      next: () => {
        this.isUserLoggedIn = false;
      },
      error: () => {
        console.log('Error logging out');
      },
    });
  }
}
