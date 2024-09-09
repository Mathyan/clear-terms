import { Component, Input } from '@angular/core';
import { Review } from '../../review';
import { ReviewItemComponent } from '../review-item/review-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [ReviewItemComponent, CommonModule],
  template: `
    <div class="container mx-auto">
      <div *ngIf="reviewsList.length > 0; else noReviews">
        <app-review-item
          *ngFor="let review of reviewsList"
          [review]="review"
        ></app-review-item>
      </div>
      <ng-template #noReviews>
        <p>No reviews found.</p>
      </ng-template>
    </div>
  `,
})
export class ReviewListComponent {
  @Input()
  reviewsList: Review[] = [];
}
