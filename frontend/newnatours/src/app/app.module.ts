import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ToursModule } from './components/tours/tours.module';
import { ToastrModule } from 'ngx-toastr';
import { ServicesModule } from './services/service.module';
import { AuthModule } from './components/auth/auth.module';
import { UsersModule } from './components/users/users.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    ToursModule,
    AuthModule,
    UsersModule,
    ToastrModule.forRoot(),
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
