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
    RouterModule.forRoot([
      {
        path: '',
        component: GitStatsComponent,
      },
      {
        path: 'skills',
        component: SkillFormComponent,
      },
      {
        path: 'graph',
        component: GraphComponent,
      },
      {
        path: 'git-stats',
        component: GitStatsComponent
      }
    ])
  ],
  providers: [GitHubService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    // overlayContainer.themeClass='custom-theme-1'
  }
}
