import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternetRoutingModule } from './internet-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    InternetRoutingModule
  ],
  declarations: [HomeComponent]
})
export class InternetModule { }
