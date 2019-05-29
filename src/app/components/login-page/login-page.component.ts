import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  user: User;

  constructor(private authService: AuthService, private router: Router, private firebaseAuth: AngularFireAuth) {

    this.firebaseAuth.user.subscribe(
      user => {
        this.user = user;
        if (user) {
          this.router.navigateByUrl('/');
        }
      }
    );
  }

  googleSignIn() {
    this.authService.doGoogleLogin()
      .then(() => {
        this.router.navigateByUrl('/');
      });
  }
}
