import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  notifications: any[] = [
    { channelName: 'Channel 1', message: 'started a live', time: '10:00 AM', image: 'channel_image1.jpg', liveUrl: '#' },
    { channelName: 'Channel 2', message: 'started a live', time: '11:00 AM', image: 'channel_image2.jpg', liveUrl: '#' },
    // Añade más notificaciones según sea necesario
  ];

  constructor() { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    // Lógica para cargar las notificaciones, si es necesario
  }

  goToLive(url: string): void {
    window.location.href = url;
  }
}
