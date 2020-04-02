import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  submit() {
    this.auth.emailSignin(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).then(() => this.router.navigate(['../']))
      .catch(err => console.log('error loging in', err));
  }
}
