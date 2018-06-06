import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularMatImportsModule } from './angular-mat-imports/angular-mat-imports.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BackOfficeComponent } from './back-office/back-office.component';
import { LogInComponent } from './log-in/log-in.component';
import { SurfService } from './surf.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { SurfGuard, LogInGuard } from './surf.guard';
import { SurfAdminGuard } from './surf-admin.guard';
import { MessageBusService } from './services/message-bus.service';
import { HomeComponent } from './home/home.component';
import { NavFooterComponent } from './nav-footer/nav-footer.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularMatImportsModule,
    AppRoutingModule,
    FlexLayoutModule ,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    DashBoardComponent,
    BackOfficeComponent,
    LogInComponent,
    NotFoundComponent,
    HomeComponent,
    NavFooterComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [SurfService, SurfGuard, MessageBusService, SurfAdminGuard, LogInGuard]
})
export class AppModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
