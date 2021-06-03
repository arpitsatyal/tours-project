import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/app/models/reviewModel';
import { notifyService } from 'src/app/services/notify.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {
creview
tourId
submitting = false
isUpdate = false
reviewId
  constructor(
    private reviewService: ReviewService,
    private notify: notifyService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.routeConfig.path.split('/')[1] === 'updateReview') this.isUpdate = true
    this.tourId = this.activatedRoute.snapshot.params.tourId
    this.reviewId = this.activatedRoute.snapshot.params.reviewId
    this.creview = new Review({})
  }
  createReview() {
    this.submitting = true
    this.reviewService.createReview(this.creview, this.tourId)
    .subscribe((res: any) => {
      this.submitting = false
      this.notify.showSuccess('review created!')
      // this.router.navigate(['/tours/getOneTour/'])
    }, err => {
      this.submitting = false
      this.notify.showError(err)
    })
  }
  updateReview(reviewId) {
    this.reviewService.updateReview(reviewId, this.tourId, this.creview)
    .subscribe(() => {
      this.notify.showInfo('review updated')
    }, err => this.notify.showError(err))
  }
}
