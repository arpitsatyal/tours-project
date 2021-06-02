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
  constructor(
    private reviewService: ReviewService,
    private notify: notifyService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tourId = this.activatedRoute.snapshot.params.tourId
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
}
