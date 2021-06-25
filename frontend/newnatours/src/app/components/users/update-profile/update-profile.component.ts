import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/userModel';
import { notifyService } from 'src/app/services/notify.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
toUpdate
selectedFile
submitting
imagePath 
userPhoto = JSON.parse(localStorage.getItem('user')).photo
  constructor(
    private userService: UsersService,
    private notify: notifyService
  ) { 
    this.imagePath = environment.imageUrl + 'img/' + 'users'
  }

  ngOnInit(): void {
    this.toUpdate = new User({})
  }
  onFileSelected(e) {
    this.selectedFile = <File> e.target.files[0]
  }
  updateMe() {
    this.submitting = true
    this.userService.updateMe(this.toUpdate, this.selectedFile)
    .subscribe((res: any) => {
      localStorage.setItem('user', JSON.stringify(res.updatedUser))
      this.userPhoto = res.updatedUser.photo
      this.notify.showSuccess('profile updated!')
      this.submitting = false
    }, err => {
      this.notify.showError(err)
      this.submitting = false
    })
  }
}
