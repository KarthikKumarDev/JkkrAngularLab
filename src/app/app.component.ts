import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkTheme = false;
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router, private breakpointObserver : BreakpointObserver ) {
  }

  public signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        this.router.navigate(['git-stats'])
        this.isLoggedIn = true;
      })
      .catch((err) => console.log(err));
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  public logout(){
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
