import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private ws!: WebSocket;

  connect(url: string, channelId: string): WebSocket {
    this.ws = new WebSocket(`${url}?channelId=${channelId}`);
    return this.ws;
  }
}
