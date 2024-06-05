import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../core/webSocket.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']  // 'styleUrl' should be 'styleUrls'
})
export class ViewerComponent implements AfterViewInit, OnDestroy {
  nombreStream!: string;
  descripcionStream!: string;
  canal!: string;
  private mediaRecorder!: MediaRecorder;
  private ws!: WebSocket;
  private stream!: MediaStream;

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  constructor(private websocketService: WebSocketService, private route: ActivatedRoute) {}

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.nombreStream = params['nombre'];
      this.descripcionStream = params['descripcion'];
      this.canal = params['id'];
      this.initializeStream();
    });
  }

  private initializeStream() {
    const videoElement = this.videoElement.nativeElement;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.stream = stream;
        videoElement.srcObject = stream;
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0 && this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(event.data);
          }
        };
      })
      .catch(error => {
        console.error('Error accessing media devices.', error);
      });
  }

  startStream() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
      this.ws = this.websocketService.connect('ws://localhost:9780', this.canal);
      this.ws.onopen = () => {
        console.log('Connected to WebSocket server');
        this.mediaRecorder.start(100); // Start recording with 100ms interval for data availability
      };
      this.ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } else {
      console.error('MediaRecorder not initialized or already recording.');
    }
  }

  stopStream() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    if (this.ws) {
      this.ws.close();
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }

  ngOnDestroy() {
    this.stopStream();
  }
}
