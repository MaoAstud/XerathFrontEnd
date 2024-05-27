import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileImage: string = 'default_profile.png';
  userName: string = 'User Name';
  editProfileFormVisible: boolean = false;
  channelFormVisible: boolean = false;
  editUserName: string = '';
  editPassword: string = '';
  channelName: string = '';
  channelDescription: string = '';
  subscribedChannels: any[] = [
    { name: 'Subscribed Channel 1', description: 'Description for Subscribed Channel 1', image: 'channel_image1.jpg', isLive: true },
    { name: 'Subscribed Channel 2', description: 'Description for Subscribed Channel 2', image: 'channel_image2.jpg', isLive: false },
  ];
  followedChannels: any[] = [
    { name: 'Followed Channel 1', description: 'Description for Followed Channel 1', image: 'channel_image3.jpg', isLive: true },
    { name: 'Followed Channel 2', description: 'Description for Followed Channel 2', image: 'channel_image4.jpg', isLive: false },
  ];

  ngOnInit(): void {
    this.loadChannels();
  }

  editProfile(): void {
    this.editProfileFormVisible = true;
  }

  saveProfile(): void {
    // Implementa la lógica para guardar el perfil aquí
    this.editProfileFormVisible = false;
  }

  showBecomeChannelForm(): void {
    this.channelFormVisible = true;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async saveChannel(): Promise<void> {
    if (this.channelName && this.channelDescription) {
      try {
        const response = await fetch("http://tu-api-url/api/streaming/channel", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.channelName, description: this.channelDescription })
        });

        if (response.ok) {
          // Redirigir o actualizar la interfaz según sea necesario
        } else {
          alert('Error saving channel details');
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Error saving channel details');
      }
    } else {
      alert('Please fill out all fields');
    }
  }

  loadChannels(): void {
    // Lógica para cargar los canales suscritos y seguidos
  }
}
