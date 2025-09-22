import { ResolveFn, Routes } from '@angular/router';

import { canLeaveEditPage, NewTaskComponent } from '../tasks/new-task/new-task.component';
import { TasksService } from "../tasks/tasks.service";
import { inject } from "@angular/core";
import { Task } from "../tasks/task/task.model";

const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  routerState
) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    );

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};

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
