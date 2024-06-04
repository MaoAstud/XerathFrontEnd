import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'XERATH';

  constructor(private titleService:Title) {
    this.titleService.setTitle("Xerath Gaming");
  }
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