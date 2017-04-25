import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminModule } from './admin/admin.module';
import { RuptRoutingModule } from './rupt.routing.module';
import { MaterializeModule } from 'angular2-materialize';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AdminModule,
    RuptRoutingModule,
    MaterializeModule
  ],
  providers: [
    AuthGuard,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
