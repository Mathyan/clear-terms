import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpResponse } from '@angular/common/http';
import { AppResponse } from '../app-response';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers: [UserService],
  template: `
    <div class="flex justify-center items-center h-screen">
      <div class="bg-white p-8 rounded shadow-md w-96">
        <h1 class="text-2xl font-bold mb-4">Login</h1>
        <form>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              type="email"
              id="email"
              name="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              [(ngModel)]="email"
            />
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              type="password"
              id="password"
              name="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              [(ngModel)]="password"
            />
          </div>
          <div class="flex justify-between items-center">
            <button
              type="submit"
              class="bg-indigo-500 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              (click)="login()"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  constructor(private userService: UserService) {}
  email = '';
  password = '';
  login() {
    this.userService.login(this.email, this.password).subscribe({
      next: (response: HttpResponse<AppResponse>): void => {
        if (response.status === 200 && response.body) {
          console.log(response.body.message, response.body.status);
        }
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }
}
