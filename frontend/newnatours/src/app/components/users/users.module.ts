import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UsersRoutingModule } from './users.routing';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UpdateProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
