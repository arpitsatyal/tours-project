import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToursRoutingModule } from './tours.routing';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { EditToursComponent } from './edit-tours/edit-tours.component';
import { CreateToursComponent } from './create-tours/create-tours.component';
import { ToursComponent } from './get-tours/tours.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { GetOneTourComponent } from './get-one-tour/get-one-tour.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { CreateReviewComponent } from './create-review/create-review.component';
import { SearchTourComponent } from './search-tour/search-tour.component';

@NgModule({
  declarations: [ToursComponent, WelcomeComponent,
     HeaderComponent, FooterComponent, EditToursComponent, CreateToursComponent, GetOneTourComponent, ReviewsComponent, CreateReviewComponent, SearchTourComponent],
  imports: [
    CommonModule,
    ToursRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})

export class ToursModule { }
