import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatSidenavModule, MatButtonModule, MatSlideToggleModule, MatCardModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule, MatSnackBarModule, MatDatepickerModule } from '@angular/material';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SkillFormComponent } from './skillForm/skill-form.component';
import { GraphComponent } from './graphs/graph.component';
import { GitStatsComponent } from './git-stats/git-stats.component';
import { HttpClientModule } from '@angular/common/http';
import { GitHubService } from './services/github.service';
import { HttpModule } from '../../node_modules/@angular/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AppRoutes } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    SkillFormComponent,
    GraphComponent,
    GitStatsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutes
  ],
  providers: [GitHubService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    // overlayContainer.themeClass='custom-theme-1'
  }
}
