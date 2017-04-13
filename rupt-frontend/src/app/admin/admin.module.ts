import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { AdministradoresComponent } from './administradores/administradores.component';

@NgModule({
  imports: [
    CommonModule
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
