import { Component } from '@angular/core';
import { ReviewItemComponent } from './review-item/review-item.component';
import { Review } from '../review';
import { ReviewService } from '../review.service';
import { ReviewListComponent } from './review-list/review-list.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [ReviewItemComponent, ReviewListComponent],
  providers: [ReviewService],
  template: '<app-review-list [reviewsList]="reviews"></app-review-list>',
})
export class ReviewComponent {
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) {
    this.reviewService.getReviews().subscribe((requestedReviews: Review[]) => {
      this.reviews = requestedReviews;
    });
  }
}
