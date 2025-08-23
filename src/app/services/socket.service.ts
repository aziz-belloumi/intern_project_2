import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket!: WebSocket; // don't instantiate yet
  private eventsSubject = new Subject<{ type: string, payload?: any }>();
  events$ = this.eventsSubject.asObservable();

  connect() {
    if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
      this.socket = new WebSocket('ws://localhost:5077/ws');
      this.socket.onopen = () => console.log('WebSocket connected');
      this.socket.onclose = () => console.log('WebSocket disconnected');
      this.socket.onerror = (err) => console.error('WebSocket error:', err);

      this.socket.onmessage = (msg) => {
        console.log('WebSocket message received:', msg.data);
        const data = JSON.parse(msg.data);
        this.eventsSubject.next(data);
      };
    }
  }

  close() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
    }
  }
}

