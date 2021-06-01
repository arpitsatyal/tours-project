import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { notifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user
  submitting = false
  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: notifyService

  ) { }

  ngOnInit(): void {
    this.user = new User({})
  }
  login() {
    this.submitting = true
    this.authService.login(this.user)
    .subscribe((res: any) => {
      this.submitting = false
    localStorage.setItem('token',res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    this.router.navigate(['/tours'])
    }, err => {
      this.submitting = false
      this.notify.showError(err)
    })
  }
}
