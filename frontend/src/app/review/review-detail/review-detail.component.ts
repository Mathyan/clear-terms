import { Component, Input } from '@angular/core';
import { Review } from '../../review';

@Component({
  selector: 'app-review-detail',
  standalone: true,
  imports: [],
  template: ` <p>review-detail works!</p> `,
  styles: ``,
})
export class ReviewDetailComponent {
  @Input() review: Review = {} as Review;
}
