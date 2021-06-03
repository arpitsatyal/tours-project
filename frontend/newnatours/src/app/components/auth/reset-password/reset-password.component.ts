import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { notifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password
  passwordConfirm
  token
  submitting 
  constructor(
    private notify: notifyService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params.token
  }
  resetPassword() {
    this.submitting = true
    this.authService.resetPassword(this.token, {
      password: this.password,
      passwordConfirm: this.passwordConfirm
    })
    .subscribe(res => {
      this.submitting = false
      console.log(res)
      this.notify.showSuccess('password changed!')
    }, err => {
      this.submitting = false
      this.notify.showError(err)
    })
  }
}
