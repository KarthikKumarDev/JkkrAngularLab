import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayContainer,MdToolbarModule,MdSidenavModule,MdButtonModule,MdSlideToggleModule,MdCardModule,MdInputModule,MdSelectModule,MdProgressSpinnerModule,MdSnackBarModule,MdDatepickerModule} from '@angular/material';
import { SkillFormComponent } from './components/skill-form.component';
import { GraphComponent } from './graphs/graph.component';
@NgModule({
  declarations: [
    AppComponent,
    SkillFormComponent,
    GraphComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdButtonModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdCardModule,
    MdInputModule,
    MdSelectModule,
    MdProgressSpinnerModule,
    MdSnackBarModule,
    MdDatepickerModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
    {
      path: 'skills',
      component: SkillFormComponent,  
    },
    {
      path: 'graph',
      component: GraphComponent,
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
