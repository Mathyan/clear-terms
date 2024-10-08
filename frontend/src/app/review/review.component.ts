import { Component, OnInit } from '@angular/core';
import { ReviewItemComponent } from './review-item/review-item.component';
import { Review } from '../review';
import { ReviewService } from '../review.service';
import { ReviewListComponent } from './review-list/review-list.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [ReviewItemComponent, ReviewListComponent],
  providers: [ReviewService, UserService],
  template: `<div class="container mx-auto">
    @if (isUserLoggedIn) {
      <button
        (click)="navigateToForm()"
        class="mb-4 mt-1 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
      >
        Add New Review
      </button>
    }
    <app-review-list [reviewsList]="reviews"></app-review-list>
  </div>`,
})
export class ReviewComponent implements OnInit {
  reviews: Review[] = [];
  isUserLoggedIn = false;

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private userService: UserService,
  ) {
    this.reviewService.getReviews().subscribe((requestedReviews: Review[]) => {
      this.reviews = requestedReviews;
    });
  }
  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.isUserLoggedIn = !!user;
        console.log('User:', user);
      },
      error: () => {
        this.isUserLoggedIn = false;
      },
    });
  }

  navigateToForm() {
    this.router.navigate(['/review/new']);
  }
}
