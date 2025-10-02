import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket?: WebSocket;
  private messagesSubject = new Subject<any>();
  public messages$ = this.messagesSubject.asObservable();

  private manualClose = false;

  connect() {
    if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
      this.manualClose = false;

      this.socket = new WebSocket('ws://localhost:5077/ws');

      this.socket.onopen = () => {
        console.log('✅ WebSocket connected');
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.messagesSubject.next(data);
        } catch (err) {
          console.error('❌ Error parsing WS message', err);
        }
      };

      this.socket.onclose = () => {
        console.warn('⚠️ WebSocket closed');
        if (!this.manualClose) {
          console.log('🔄 Retrying in 3s...');
          setTimeout(() => this.connect(), 3000);
        }
      };

      this.socket.onerror = (err) => {
        console.error('WebSocket error:', err);
        this.socket?.close();
      };
    }
  }

  close() {
    this.manualClose = true;
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
    }
  }
}

