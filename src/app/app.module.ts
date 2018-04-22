import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import {Http,HttpModule} from '@angular/http';
import {ConnectionBackend} from '@angular/http';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule,MatSidenavModule,MatButtonModule,MatSlideToggleModule,MatCardModule,MatInputModule,MatSelectModule,MatStepperModule,MatProgressSpinnerModule,MatSnackBarModule,MatDatepickerModule} from '@angular/material';
import { OverlayContainer} from '@angular/cdk/overlay';
import { SkillFormComponent } from './skillForm/skill-form.component';
import { GraphComponent } from './graphs/graph.component';
import { QualificationComponent }from './qualification/qualification.component';

@NgModule({
  declarations: [
    AppComponent,
    SkillFormComponent,
    GraphComponent,
    QualificationComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    MatStepperModule,
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
    RouterModule.forRoot([
    {
      path: 'skills',
      component: SkillFormComponent,  
    },
    {
      path: 'graph',
      component: GraphComponent,
    },
    {
      path: 'qualification',
      component: QualificationComponent,
    }
])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer : OverlayContainer){
   // overlayContainer.themeClass='custom-theme-1'
  }
 }
