import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private zone: NgZone) {

    this.firebaseAuth.user.subscribe(
      user => {
        if (user) {
          this.zone.run(() => { this.router.navigate(['/']); });

          // tslint:disable-next-line: no-unused-expression
        } else { console.error; }


      }
    );
  }

  googleSignIn() {
    this.authService.doGoogleLogin()
      .then(() => {
        this.zone.run(() => { this.router.navigate(['/']); });
      }), (console.error()
      );
  }

}

// user_login() {
//   this.userService.login(credentials).subscribe((res) => {
//   console.log(res);
//   }, (error) => {
//   console.log(error);
//   });
