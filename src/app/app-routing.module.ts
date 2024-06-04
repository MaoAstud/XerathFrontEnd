import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { DiscoverComponent } from './discover/discover.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { StreamComponent } from './stream/stream.component';
import { ViewerComponent } from './viewer/viewer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'channel', component: ChannelComponent },
  { path: 'stream/:id', component: StreamComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'historial', component: HistoryComponent },
  { path: 'notificaciones', component: NotificationComponent },
  { path: 'view/:nombre/:descripcion/:id', component: ViewerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
