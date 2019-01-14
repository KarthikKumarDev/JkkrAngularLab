import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkTheme = false;
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  public signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        this.router.navigate(['git-stats'])
        this.isLoggedIn = true;
      })
      .catch((err) => console.log(err));
  }

  public logout(){
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
