import { Component, EventEmitter, Output } from '@angular/core';
import { Service } from '../core/service.core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  currentUser: any;
  isAuthenticated: boolean | undefined;

  constructor(private authService: Service) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.authService.isAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  @Output() btnLogin = new EventEmitter();

  llamarLogin(){
    this.btnLogin.emit();
  }

  cerrarSesion(){


    this.authService.logout();

    this.llamarLogin();
  }
}
