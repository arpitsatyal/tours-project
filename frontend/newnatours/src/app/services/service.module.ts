import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { notifyService } from "./notify.service";
import { TourService } from "./tours.service";
import { AuthService } from './auth.service'
import { ReviewService} from './review.service';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component'
import { UsersService } from "./users.service";
import { UploadService } from "./upload.service";
@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [
        CommonModule
      
    ],
    providers: [
        notifyService,
        TourService,
        AuthService,
        ReviewService,
        UsersService,
        UploadService
    ]
  })

  export class ServicesModule {}