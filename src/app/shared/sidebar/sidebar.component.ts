import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {MatIconModule} from "@angular/material/icon";
import {AuthService} from "../../services/auth.service";
import {SocketService} from "../../services/socket.service";
import {WebSocketListenerService} from "../../services/websocket-listener.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule ,MatIconModule],
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent {
  constructor(private wsListener: WebSocketListenerService ,private router: Router, private authService: AuthService, private socketService: SocketService) { }
  onLogOutClick() {
    this.wsListener.disconnect();
    this.authService.logOut();
    this.socketService.close();// to close the socket connection and prevent memory leaks
    this.router.navigate(['/home'])
  }
}
