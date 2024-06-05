// src/app/core/webSocket.service.mock.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockWebSocketService {
  connect(url: string, channelId: string): WebSocket {
    return new WebSocketMock(`${url}/${channelId}`);
  }
}

class WebSocketMock extends WebSocket {
  private eventListeners: { [key: string]: Function[] } = {};

  constructor(url: string) {
    super(url);
  }

  override onmessage: ((this: WebSocket, ev: MessageEvent<any>) => any) | null = null;

  override addEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
    if (type === 'message' && typeof listener === 'function') {
      this.onmessage = listener as ((this: WebSocket, ev: MessageEvent<any>) => any);
    } else {
      super.addEventListener(type, listener);
    }
  }

  override removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
    if (this.eventListeners[type]) {
      this.eventListeners[type] = this.eventListeners[type].filter(l => l !== listener);
    }
  }

  simulateMessage(data: any): void {
    if (this.eventListeners['message']) {
      this.eventListeners['message'].forEach(listener => listener({ data }));
    }
  }

  simulateOpen(): void {
    if (this.eventListeners['open']) {
      this.eventListeners['open'].forEach(listener => listener({}));
    }
  }

  simulateClose(): void {
    if (this.eventListeners['close']) {
      this.eventListeners['close'].forEach(listener => listener({}));
    }
  }

  simulateError(): void {
    if (this.eventListeners['error']) {
      this.eventListeners['error'].forEach(listener => listener({}));
    }
  }
}
