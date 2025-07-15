import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: User | null = null ;

  constructor(private userService: UserService , private authService: AuthService ,private router: Router ) {}
  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user = this.userService.getUser();
    });
  }

  navigateTo(route: string) {
    this.authService.logOut();
    this.router.navigate([`/${route}`]);
  }
}
