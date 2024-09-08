import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-indigo-600 p-4 flex items-center justify-between">
      <h1 class="text-white text-2xl">Clear Terms</h1>
      <nav class="flex space-x-4">
        <a routerLink="/" class="text-white text-lg hover:underline">Home</a>
        <a routerLink="/user" class="text-white text-lg hover:underline"
          >User</a
        >
        <a routerLink="/login" class="text-white text-lg hover:underline"
          >Login</a
        >
      </nav>
    </div>
  `,
})
export class TopBarComponent {}
