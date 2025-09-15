import { Component, computed, DestroyRef, input, OnInit } from '@angular/core';
import { UsersService } from "../users.service";
// import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  // userName = '';
  userId = input.required<string>();

  constructor(
    private usersService: UsersService,
    // private activatedRoute: ActivatedRoute,
    // private destroyRef: DestroyRef
  ) {
  }

  userName = computed(
    () => this.usersService.users.find(
      user => user.id === this.userId()
    )?.name
  );

  ngOnInit() {
    //   const subscription = this.activatedRoute.paramMap.subscribe({
    //     next: paramMap =>
    //       this.userName = this.usersService.users.find(
    //         user => user.id === paramMap.get('userId')
    //       )?.name || ''
    //   })

    //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
