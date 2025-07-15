import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.css']
})
export class UserInfoCardComponent implements OnInit {
  user: User | null = null ;

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user = this.userService.getUser();
    });
  }
}
