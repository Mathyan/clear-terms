import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../review';
import { UserService } from '../../user.service';
import { ReviewService } from '../../review.service';
import { User } from '../../user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-detail',
  standalone: true,
  imports: [CommonModule],
  providers: [UserService, ReviewService],
  template: `
    <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      @if (review.title) {
        <h2 class="text-3xl font-bold mb-4">{{ review.title }}</h2>

        <div class="mb-6">
          <h4 class="text-xl font-semibold mb-2">
            Review by: {{ userOwningReview.name }}
          </h4>
          <p class="text-sm text-gray-600">
            Email: {{ userOwningReview.email }}
          </p>
        </div>
      } @else {
        <p class="text-red-500">Review not found or unavailable.</p>
      }

      @if (review.content) {
        <div class="mb-6">
          <p class="text-gray-800">{{ review.content }}</p>
          <p class="text-sm text-gray-500">
            Published on {{ review.createdAt | date: 'medium' }}
          </p>
        </div>
      }

      @if (
        ((userLoggedIn && user.role === 2) || user.id === review.userId) &&
        review.title
      ) {
        <div class="mt-6">
          <button
            class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            (click)="deleteReview()"
          >
            Delete Review
          </button>
        </div>
      }
    </div>
  `,
})
export class ReviewDetailComponent implements OnInit {
  userLoggedIn = false;
  review: Review = {} as Review;
  userOwningReview: User = {} as User;
  user: User = {} as User;
  reviewId: number | undefined;
  constructor(
    private userService: UserService,
    private reviewService: ReviewService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.userLoggedIn = !!user;
      },
      error: () => {
        console.log('Error getting user');
        this.userLoggedIn = !!this.user;
      },
    });
  }

  @Input()
  set id(id: number) {
    this.reviewId = id;
    this.reviewService.getReviewById(id).subscribe({
      next: (review) => {
        this.review = review;
        if (this.review) {
          this.userService.getUserById(this.review.userId).subscribe({
            next: (user) => {
              this.userOwningReview = user;
            },
            error: () => {
              console.log('Error getting user');
            },
          });
        }
      },
      error: () => {
        console.log('Error getting review');
      },
    });
  }

  deleteReview() {
    if (this.reviewId) {
      this.reviewService.deleteReview(this.reviewId).subscribe({
        next: () => {
          console.log('Review deleted');
          this.router.navigate(['/reviews']);
        },
        error: () => {
          console.log('Error deleting review');
        },
      });
    }
  }
}
