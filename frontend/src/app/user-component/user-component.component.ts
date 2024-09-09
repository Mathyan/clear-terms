import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [UserService],
  template: `
    <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-6">Edit User Information</h1>
      <div *ngIf="!loggedIn" class="text-center text-red-500">
        You must be logged in to view this page
      </div>

      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-bold mb-2"
            >Username</label
          >
          <input
            type="text"
            id="username"
            formControlName="username"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter username"
          />
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
            placeholder="Enter email"
          />
        </div>

        <!-- Name Input -->
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-bold mb-2"
            >Name</label
          >
          <input
            type="text"
            id="name"
            formControlName="name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter name"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Role</label>
          <p class="text-gray-800">
            {{ userForm.get('role')?.value === 2 ? 'Admin' : 'User' }}
          </p>
        </div>

        <div class="text-right">
          <button
            type="submit"
            class="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
            [disabled]="userForm.invalid"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  `,
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  user!: User;
  loggedIn = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user: User) => {
        this.loggedIn = true;
        this.user = user;

        this.userForm = this.fb.group({
          username: [user.username, Validators.required],
          email: [user.email, [Validators.required, Validators.email]],
          name: [user.name || '', Validators.required],
          role: [user.role],
        });
      },
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.value;

      const confirmMessage = `
        Are you sure you want to change:
        - Username: ${this.user.username} → ${updatedUser.username}
        - Email: ${this.user.email} → ${updatedUser.email}
        - Name: ${this.user.name} → ${updatedUser.name}
      `;
      updatedUser.id = this.user.id;
      if (confirm(confirmMessage)) {
        this.userService.updateUser(updatedUser).subscribe({
          next: () => {
            alert('User updated successfully');
            this.router.navigate(['/user']);
          },
          error: () => {
            alert('Failed to update user');
          },
        });
      }
    }
  }
}
