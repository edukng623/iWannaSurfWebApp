import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashBoardComponent } from './dash-board/dash-board.component';
import { BackOfficeComponent } from './back-office/back-office.component';
import { LogInComponent } from './log-in/log-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SurfGuard, LogInGuard } from './surf.guard';
import { SurfAdminGuard } from './surf-admin.guard';
import { HomeComponent } from './home/home.component';
import { SpotEditComponent } from './spot-edit/spot-edit.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  { path: 'dashboard', component: DashBoardComponent, canActivate: [SurfGuard] },
  { path: 'backoffice', component: BackOfficeComponent, canActivate: [SurfGuard] },
  { path: 'login', component: LogInComponent, canActivate: [LogInGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'spots/edit/:id', component: SpotEditComponent, canActivate: [SurfGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [SurfGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
