import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ToursModule } from './tours/tours.module'
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ToursModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
