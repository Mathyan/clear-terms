import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from './review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}
  public getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>('/api/reviews');
  }
  public createReview(review: object): Observable<object> {
    return this.http.post('/api/reviews', review, { withCredentials: true });
  }
  public deleteReview(id: string): Observable<object> {
    return this.http.delete(`/api/reviews/${id}`);
  }
}
