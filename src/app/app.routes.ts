import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';
import { GitStatsComponent } from './git-stats/git-stats.component';
import { SkillFormComponent } from './skillForm/skill-form.component';
import { GraphComponent } from './graphs/graph.component';

const appRoutes: Routes = [
    {
        path: '',
        component: GitStatsComponent,
      },
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
        component: GitStatsComponent
      }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);