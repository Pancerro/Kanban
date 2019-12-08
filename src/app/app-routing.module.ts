import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './user/welcome-page/welcome-page.component';
import { DashboardsComponent } from './dashboards/dashboards/dashboards.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/welcome-page', pathMatch: 'full'},
  {path: 'welcome-page', component: WelcomePageComponent},
  {
    path: 'dashboard',
    component: DashboardsComponent,
    canActivate: [AuthGuard],
  }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
