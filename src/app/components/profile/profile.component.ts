import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from "../../models/user.model";
import { selectUser } from "../../state/auth/auth.selectors";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: User | null = null;
  preferredRoomIds: number[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(selectUser).subscribe(user => {
      this.user = user;

      if (user && typeof user.PreferredRoomIds === 'string' && user.PreferredRoomIds.trim().length > 0) {
        this.preferredRoomIds = user.PreferredRoomIds
          .split(',')
          .map((id: string) => Number(id.trim()))
          .filter((id: number) => !isNaN(id));
      } else {
        this.preferredRoomIds = [];
      }
    });
  }
}
