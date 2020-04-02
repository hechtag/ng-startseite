import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs';
import { User } from './core/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-startseite';
  user$: Observable<User>;
  loading: boolean;
  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.user$ = this.auth.user$;
  }

  get checkUser() {
    return !this.auth.isLoggedIn() && this.auth.user !== undefined;
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  handleLogin() {
    this.loading = true;
    this.auth.emailSignin('jm.hecht@gmx.de', '123123')
      .then(() => {
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
        if (error.code === 'auth/wrong-password') {
          console.log("Benutzer nicht gefunden oder Passwort falsch.");
        } else {
          console.log(error.message);
        }
      });
  }
}
