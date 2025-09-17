import { Routes } from '@angular/router';

import { TasksComponent, resolveUserTasks } from '../tasks/tasks.component';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';
import { resolveTitle, resolveUserName } from "./user-tasks/user-tasks.component";

export const usersRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
    title: 'No task selected',
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    component: TasksComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      userTasks: resolveUserTasks,
    },
    title: resolveTitle,
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
  },
];
