import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @Output() btnLogin = new EventEmitter();

  llamarLogin(){
    this.btnLogin.emit();
  }

  cerrarSesion(){


    

    this.llamarLogin();
  }
}
