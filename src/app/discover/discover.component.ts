import { Component } from '@angular/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.css'
})
export class DiscoverComponent {
  channels: any[] = [
    { name: 'Channel 1', description: 'Description for Channel 1', image: 'channel_image1.jpg', isLive: true },
    { name: 'Channel 2', description: 'Description for Channel 2', image: 'channel_image2.jpg', isLive: false },
    { name: 'Channel 3', description: 'Description for Channel 3', image: 'channel_image3.jpg', isLive: true },
    // Añade más canales según sea necesario
  ];

  filteredChannels: any[] = [...this.channels];

  ngOnInit(): void {
  }

  handleSearch(): void {
    const query = (document.getElementById('channelSearch') as HTMLInputElement).value.toLowerCase();
    this.filteredChannels = this.channels.filter(channel =>
      channel.name.toLowerCase().includes(query) || 
      channel.description.toLowerCase().includes(query)
    );
  }

  followChannel(channelName: string): void {
    alert(`Ahora estas siguiendo a ${channelName}`);
  }


}
