import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { notifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
submitting
email
  constructor(
    private notify: notifyService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  forgotPassword() {
    this.submitting = true
    this.authService.forgotPassword({
      email: this.email
    })
    .subscribe(res => {
      this.notify.showInfo('email sent. go to your inbox to reset the password.')
      this.submitting = false
    }, err => {
      this.submitting = false
      this.notify.showError(err)
    })
  }
}
