import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToursRoutingModule } from './tours.routing';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { EditToursComponent } from './edit-tours/edit-tours.component';
import { CreateToursComponent } from './create-tours/create-tours.component';
import { ToursComponent } from './get-tours/tours.component';
import { TourService } from 'src/app/services/tours.service';
import { WelcomeComponent } from '../welcome/welcome.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ToursComponent, WelcomeComponent, HeaderComponent, FooterComponent, EditToursComponent, CreateToursComponent],
  imports: [
    CommonModule,
    ToursRoutingModule,
    HttpClientModule,
    FormsModule
  ]
  
})
export class ToursModule { }
