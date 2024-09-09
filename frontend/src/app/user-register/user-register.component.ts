import { Component } from '@angular/core';
import { UserService } from '../user.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserRegister } from '../user-register';
import { User } from '../user';
import { HttpResponse } from '@angular/common/http';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [UserService],
  template: `
    <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-6">Register User</h1>
      <form [formGroup]="registerForm" (ngSubmit)="register()">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-bold mb-2"
            >Username</label
          >
          <input
            type="text"
            id="username"
            formControlName="username"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your username"
          />
          <div
            *ngIf="
              registerForm.get('username')?.invalid &&
              registerForm.get('username')?.touched
            "
          >
            <p class="text-red-500 text-sm">Username is required.</p>
          </div>
        </div>

        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold mb-2"
            >Email</label
          >
          <input
            type="email"
            id="email"
            formControlName="email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
          />
          <div
            *ngIf="
              registerForm.get('email')?.invalid &&
              registerForm.get('email')?.touched
            "
          >
            <p class="text-red-500 text-sm">Valid email is required.</p>
          </div>
        </div>

        <!-- Optional Name Input -->
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-bold mb-2"
            >Name (optional)</label
          >
          <input
            type="text"
            id="name"
            formControlName="name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your name"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-bold mb-2"
            >Password</label
          >
          <input
            type="password"
            id="password"
            formControlName="password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
          />
          <div
            *ngIf="
              registerForm.get('password')?.invalid &&
              registerForm.get('password')?.touched
            "
          >
            <p class="text-red-500 text-sm">
              Password is required and must be at least 8 characters.
            </p>
          </div>
        </div>

        <div class="text-right">
          <button
            type="submit"
            class="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
            [disabled]="registerForm.invalid"
          >
            Register
          </button>
        </div>
      </form>
      <div *ngIf="createionSuccessful" class="text-green-500 mt-4">
        Registration successful. Redirecting to login page...
      </div>
      <div *ngIf="nameTaken" class="text-red-500 mt-4">
        Username or email already exists.
      </div>
    </div>
  `,
})
export class UserRegisterComponent {
  createionSuccessful = false;
  nameTaken = false;
  registerForm: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  public register() {
    const formValue: UserRegister = this.registerForm.value;
    if (!formValue.name) {
      delete formValue.name;
    }

    this.userService.register(formValue).subscribe({
      next: (response: HttpResponse<User>) => {
        console.log(response.body);
        this.createionSuccessful = true;
        timer(2000).subscribe(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        if (error.status === 409) {
          console.error('Username or email already exists');
          this.nameTaken = true;
        }
        console.error(error);
      },
    });
  }
}
