import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternetRoutingModule } from './internet-routing.module';
import { HomeComponent } from './home/home.component';
import { ContatoComponent } from './contato/contato.component';

@NgModule({ 
  imports: [
    CommonModule,
    InternetRoutingModule
  ],
  declarations: [
    HomeComponent,
    ContatoComponent
  ]
})
export class InternetModule { }
