import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HotspotComponent } from './hotspot/hotspot.component';
import { RainComponent } from './rain/rain.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'rain', component: RainComponent },
  { path: 'hotspot', component: HotspotComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
