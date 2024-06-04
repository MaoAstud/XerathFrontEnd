import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Service } from '../core/service.core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.css'
})
export class DiscoverComponent {
  channels: any[] = [];

  filteredChannels: any[] = [...this.channels];
  currentUser: any;
  isAuthenticated: boolean | undefined;
  constructor(private Service: Service,
    private toastr: ToastrService,private router: Router){}

  ngOnInit(): void {
    this.consultarCanales()
    this.Service.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.Service.isAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  handleSearch(): void {
    const query = (document.getElementById('channelSearch') as HTMLInputElement).value.toLowerCase();
    this.filteredChannels = this.channels.filter(channel =>
      channel.nombreCanal.toLowerCase().includes(query) || 
      channel.descripcionCanal.toLowerCase().includes(query)
    );
  }

  followChannel(channelName: string): void {
    if(this.isAuthenticated){
      this.toastr.success(`Ahora estas siguiendo a ${channelName}`);
    }else{
      this.toastr.info("Para seguir a canales crea tu cuenta o inicia sesión");
    }
    
  }

  consultarCanales(): void {
    this.Service.buscarCanales().subscribe(
      response => {
        if (response.canales) {
          this.channels = response.canales;
        } else {
          // Mensaje de error si las credenciales son incorrectas
          this.toastr.error(response.error.message);
        }
      },
      error=>{
        this.toastr.error(error.error.message);
      }
    );
  }
}
