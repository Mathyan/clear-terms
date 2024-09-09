import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ReviewService } from '../../review.service';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [ReviewService],
  template: `
    <div class="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <form [formGroup]="reviewForm" (ngSubmit)="submitReview()">
        <!-- Title Input -->
        <div class="mb-4">
          <label for="title" class="block text-gray-700 font-bold mb-2"
            >Title</label
          >
          <input
            type="text"
            id="title"
            formControlName="title"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter review title"
          />
          <div
            *ngIf="
              reviewForm.get('title')?.invalid &&
              reviewForm.get('title')?.touched
            "
          >
            <p class="text-red-500 text-sm">
              Title is required and must be at least than 10 characters.
            </p>
          </div>
        </div>

        <!-- Content Textarea -->
        <div class="mb-4">
          <label for="content" class="block text-gray-700 font-bold mb-2"
            >Content</label
          >
          <textarea
            id="content"
            rows="5"
            formControlName="content"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your review content"
          ></textarea>
          <div
            *ngIf="
              reviewForm.get('content')?.invalid &&
              reviewForm.get('content')?.touched
            "
          >
            <p class="text-red-500 text-sm">
              Content is required and must be less 100 characters.
            </p>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="text-right">
          <button
            type="submit"
            class="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            [disabled]="reviewForm.invalid"
          >
            Submit Review
          </button>
        </div>

        <div *ngIf="reviewCreated" class="mt-4 text-green-500">
          Review created successfully!
        </div>
        <div *ngIf="reviewFailed" class="mt-4 text-red-500">
          Failed to create review.
        </div>
      </form>
    </div>
  `,
})
export class ReviewFormComponent {
  reviewForm: FormGroup;
  reviewCreated = false;
  reviewFailed = false;

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
  ) {
    this.reviewForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      content: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  submitReview(): void {
    if (this.reviewForm.valid) {
      console.log(this.reviewForm.value);
      this.reviewService.createReview(this.reviewForm.value).subscribe({
        next: (response: object): void => {
          console.log('Review created', response);
          this.reviewCreated = true;
          this.reviewFailed = false;
        },
        error: (error: Error): void => {
          console.error('Error creating review', error);
          this.reviewFailed = true;
          this.reviewCreated = false;
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
