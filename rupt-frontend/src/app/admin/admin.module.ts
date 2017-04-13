import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { AdminRoutingModule } from './admin.routing.module';
import { MaterializeModule } from 'angular2-materialize';



@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterializeModule
  ],
  exports: [
    LoginComponent
  ],
  declarations: [
    LoginComponent,
    AdministradoresComponent
  ]
})
export class AdminModule { }
