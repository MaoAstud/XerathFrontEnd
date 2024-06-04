import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../core/webSocket.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrl: './stream.component.css'
})
export class StreamComponent {
  private mediaSource!: MediaSource;
  private sourceBuffer!: SourceBuffer;
  private ws!: WebSocket;
  private channelId!: string;
  
  isSubscribed = false;
  likes = 0;
  comments = 0;
  viewers = 0;

  constructor(private websocketService: WebSocketService,private route: ActivatedRoute) {}

  ngAfterViewInit(){
    this.route.params.subscribe(params => {
      this.channelId = params['id'];
    });

    const videoElement = document.querySelector('video');
    this.mediaSource = new MediaSource();
    videoElement!.src = URL.createObjectURL(this.mediaSource);

    this.mediaSource.addEventListener('sourceopen', () => {
      this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
      this.ws = this.websocketService.connect('ws://localhost:9780', this.channelId);

      this.ws.onmessage = (event) => {
        if (event.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            this.sourceBuffer.appendBuffer(new Uint8Array(reader.result as ArrayBuffer));
          };
          reader.readAsArrayBuffer(event.data);
        }
      };
    });
  }
  // ngOnInit(): void {
  //   // Simular la carga inicial de la base de datos
  //   this.loadInitialData();

  //   // Simular incremento de viewers cada 5 segundos
  //   setInterval(() => this.incrementViewers(), 5000);
  // }

  loadInitialData(): void {
    // Aquí llamarías a tu API para obtener los datos iniciales
    this.likes = 10; // Ejemplo
    this.comments = 5; // Ejemplo
    this.viewers = 100; // Ejemplo
  }

  updateStats(): void {
    // Implementa la lógica para actualizar las estadísticas en tu interfaz
  }

  hamburgerMenuClick(menu: HTMLElement): void {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }

  sendComment(commentInput: HTMLInputElement): void {
    if (!this.isSubscribed) {
      alert('You must subscribe to comment.');
    } else {
      const comment = commentInput.value;
      if (comment.trim() !== '') {
        // Implementa la lógica para enviar el comentario a tu API y actualizar la interfaz
      } else {
        alert('Write a comment before sending.');
      }
    }
  }

  like(): void {
    this.likes++;
    // Implementa la lógica para actualizar los likes en tu API y en la interfaz
  }

  subscribe(tokenModal: HTMLElement): void {
    tokenModal.style.display = 'block';
  }

  closeModal(tokenModal: HTMLElement): void {
    tokenModal.style.display = 'none';
  }

  buyTokens(tokenAmountInput: HTMLInputElement, tokenModal: HTMLElement, subscribeButton: HTMLElement): void {
    const tokenAmount = tokenAmountInput.value;
    if (tokenAmount.trim() !== '' && !isNaN(Number(tokenAmount))) {
      alert(`Bought ${tokenAmount} tokens!`);
      tokenModal.style.display = 'none';
      this.isSubscribed = true;
      subscribeButton.style.display = 'none';
    } else {
      alert('Please enter a valid token amount.');
    }
  }

  incrementViewers(): void {
    this.viewers++;
    // Implementa la lógica para actualizar los viewers en tu API y en la interfaz
  }
}
