import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { notifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
submitting = false
user
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifyService: notifyService
  ) { }

  ngOnInit(): void {
    this.user = new User({})
  }
  signup() {
    this.submitting = true
    this.authService.register(this.user)
    .subscribe(res => {
      this.submitting = false
      this.notifyService.showInfo('you are registered, now login to continue.')
      this.router.navigate(['/login'])
      console.log(res)
    }, err => {
      this.submitting = false
      this.notifyService.showError(err)
    })
  }
}
