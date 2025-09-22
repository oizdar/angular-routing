import { Routes } from '@angular/router';

import { resolveUserTasks } from '../tasks/tasks.component';
import { canLeaveEditPage, NewTaskComponent } from '../tasks/new-task/new-task.component';

export const usersRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
    title: 'No task selected',
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    loadComponent: () => import('../tasks/tasks.component').then(module => module.TasksComponent),
    runGuardsAndResolvers: 'always', // to run also on same URL navigation, when setting task as completed
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage],
  },
];
