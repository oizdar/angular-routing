import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from "../users.service";
import { ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from "@angular/router";
// import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [
    RouterOutlet,
    RouterLink
  ]
})
export class UserTasksComponent implements OnInit {
  userName = input.required<string>();
  userId = input.required<string>();
  message = input.required<string>();

  constructor(
    private usersService: UsersService,
    // private activatedRoute: ActivatedRoute,
    // private destroyRef: DestroyRef
  ) {
  }

  // userName = computed(
  //   () => this.usersService.users.find(
  //     user => user.id === this.userId()
  //   )?.name
  // );

  ngOnInit() {
    console.log(this.message());
    //   const subscription = this.activatedRoute.paramMap.subscribe({
    //     next: paramMap =>
    //       this.userName = this.usersService.users.find(
    //         user => user.id === paramMap.get('userId')
    //       )?.name || ''
    //   })

    //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  return usersService.users.find(
    user => user.id === activatedRoute.paramMap.get('userId')
  )?.name || '';
}
