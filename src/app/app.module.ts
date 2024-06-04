import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ChannelComponent } from './channel/channel.component';
import { StreamComponent } from './stream/stream.component';
import { MenuComponent } from './menu/menu.component';
import { DiscoverComponent } from './discover/discover.component';
import { HistoryComponent } from './history/history.component';
import { NotificationComponent } from './notification/notification.component';
import { RouterLink } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Service } from './core/service.core';
import { WebSocketService } from './core/webSocket.service';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    ChannelComponent,
    StreamComponent,
    MenuComponent,
    DiscoverComponent,
    HistoryComponent,
    NotificationComponent,
    LandingComponent,
    ViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // Requerido por ngx-toastr
    ToastrModule.forRoot()
  ],
  providers: [
    Service,
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
