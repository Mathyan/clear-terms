import { Component, Input } from '@angular/core';
import { ReviewService } from '../../review.service';
import { Review } from '../../review';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-item',
  standalone: true,
  providers: [ReviewService],
  imports: [CommonModule],
  template: `
    <div
      class="p-4 mb-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200 cursor-pointer"
      (click)="goToReviewDetail(review.id)"
      (keydown.enter)="goToReviewDetail(review.id)"
      tabindex="0"
      role="button"
    >
      <h2 class="text-xl font-bold text-indigo-600 mb-2">
        {{ review.title }}
      </h2>
      <p class="text-gray-700">
        {{ review.content }}
      </p>
      <div class="text-sm text-gray-500 mt-2">
        <span>Created on: {{ review.createdAt | date: 'medium' }}</span>
      </div>
    </div>
  `,
})
export class ReviewItemComponent {
  @Input() review: Review = {} as Review;
  constructor(private router: Router) {}
  goToReviewDetail(id: number): void {
    this.router.navigate(['/reviews', id]);
  }
}
