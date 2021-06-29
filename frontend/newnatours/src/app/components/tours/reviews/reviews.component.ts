import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { notifyService } from 'src/app/services/notify.service';
import { ReviewService } from 'src/app/services/review.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
tourId
reviews
rating = [1,2,3,4,5]
user 
imagePath = environment.imageUrl + 'img/users/'
  constructor(
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private notify: notifyService
  ) { 
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.tourId = this.activatedRoute.snapshot.params.tourId
    this.reviewService.getReviews(this.tourId)
    .subscribe((res: any) => {
      this.reviews = res.reviews
    }, err => this.notify.showError(err))
  }

  deleteReview(reviewId) {
    this.reviewService.deleteReview(reviewId, this.tourId)
    .subscribe(() => {
      this.notify.showInfo('review deleted')
    }, err => this.notify.showError(err))
  }
 }
