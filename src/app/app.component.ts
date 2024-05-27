import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'XERATH';

  showLogin:boolean = false;
  showLanding:boolean = true;
  showPage:boolean = false;

  goLogin(){
    this.showLogin = true;
    this.showLanding = false;
    this.showPage = false;
  }
  goLanding(){
    this.showLogin = false;
    this.showLanding = true;
    this.showPage = false;
  }
  goPage(){
    this.showLogin = false;
    this.showLanding = false;
    this.showPage = true;
  }
}