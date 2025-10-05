import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WebSocketListenerService} from "./services/websocket-listener.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private wsListener: WebSocketListenerService) {}

  ngOnInit(): void {
    this.wsListener.initWebSocket(); // Starts the central listener
  }
  title = 'BookingSystemWeb';
}
