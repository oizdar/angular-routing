import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { usersRoutes } from "./users/users.routes";
import { inject } from "@angular/core";

const dummyCanMatch:CanMatchFn = (route, segments) => {
  const shouldGetAccess = Math.random() > 0.1;
  if(shouldGetAccess) {
    return true;
  }

  const router = inject(Router);
  return  new RedirectCommand(router.parseUrl('/unauthorized'))
}
export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: usersRoutes,
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello!'
    },
    resolve: {
      userName: resolveUserName
    },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
