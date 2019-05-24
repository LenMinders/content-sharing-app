import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  googleSignIn() {
    this.authService.doGoogleLogin()
      .then(res => {
        const url = `/${res.user.displayName}/${res.user.email}/${res.user.photoUrl}`;
        this.router.navigateByUrl(url);
      });
  }
}
