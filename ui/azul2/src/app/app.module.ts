import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LobbyComponent } from './lobby/lobby.component';
import { GameComponent } from './game/game.component';
import {
  MatInputModule
} from "@angular/material/input";
import {
  MatPaginatorModule
} from "@angular/material/paginator";
import {
  MatProgressSpinnerModule
} from "@angular/material/progress-spinner";
import {
  MatSortModule
} from "@angular/material/sort";
import {
  MatTableModule
} from "@angular/material/table";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LobbyComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
