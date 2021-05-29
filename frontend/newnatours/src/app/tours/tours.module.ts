import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToursComponent } from './tours.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { ToursRoutingModule } from './tours.routing';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TourService } from '../services/tours.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ToursComponent, WelcomeComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    ToursRoutingModule,
    HttpClientModule
  ],
  providers: [
    TourService
  ]
})
export class ToursModule { }
