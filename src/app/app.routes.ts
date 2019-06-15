import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';
import { GitStatsComponent } from './git-stats/git-stats.component';
import { SkillFormComponent } from './skillForm/skill-form.component';
import { GraphComponent } from './graphs/graph.component';
import { TextAnalysisComponent } from './text-analysis/text-analysis.component';
import { StudyTrackerComponent } from './study-tracker/study-tracker.component';

const appRoutes: Routes = [
  {
    path: 'skills',
    canActivate: [AuthGuard],
    component: SkillFormComponent,
  },
  {
    path: 'graph',
    canActivate: [AuthGuard],
    component: GraphComponent,
  },
  {
    path: 'git-stats',
    component: GitStatsComponent,
  },
  {
    path: 'text-analysis',
    component: TextAnalysisComponent,
  },
  {
    path: 'study-tracker',
    component: StudyTrackerComponent,
  },
  {
    path: '',
    redirectTo: '/git-stats',
    pathMatch: 'full',
  },
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
