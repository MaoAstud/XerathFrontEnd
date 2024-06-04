import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Service } from '../core/service.core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.css'
})

export class ChannelComponent implements OnInit{
  currentUser: any;
  isAuthenticated: boolean | undefined;
  idCanal!:string;
  constructor(private Service: Service,
    private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.Service.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.Service.isAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    this.initializeChannelCreator();

    
  }

  initializeChannelCreator(): void {
    const channelImage = document.getElementById('channelCreatorImage') as HTMLImageElement;
    const channelName = document.getElementById('channelCreatorName');
    const channelDescription = document.getElementById('channelCreatorDescription');
    
    this.Service.getCanalById(this.currentUser.idUsuario).subscribe(
      (response) => {
        // Manejar la respuesta del servicio aquí
        console.log(response);
        channelImage.src = 'https://media.admagazine.com/photos/622a6ad4818965ae9b897513/3:2/w_1997,h_1331,c_limit/Jungkook.jpg';
        channelName!.textContent = response.canal.nombreCanal;
        channelDescription!.textContent = response.canal.descripcionCanal;
        this.idCanal = response.canal.idCanal;
        // Actualizar variables en el componente con la respuesta del servicio
      },
      (error) => {
        this.toastr.error(error.error.message);
        channelImage.src = 'https://media.admagazine.com/photos/622a6ad4818965ae9b897513/3:2/w_1997,h_1331,c_limit/Jungkook.jpg';
        channelName!.textContent = 'Example Channel Name';
        channelDescription!.textContent = 'This is an example description for the channel.';
        // Manejar el error si ocurre
      }
    );
    


  }


  startLiveStream() {
    const streamTitle = (document.getElementById('streamTitle') as HTMLInputElement).value;
    const streamDescription = (document.getElementById('streamDescription') as HTMLInputElement).value;

    if (streamTitle && streamDescription) {
      this.router.navigate(['/view', streamTitle, streamDescription, this.idCanal]);
    } else {
      this.toastr.error("Por favor llena el nombre y descripción del Stream");
    }
  }

}
