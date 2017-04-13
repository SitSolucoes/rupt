import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { AdminRoutingModule } from './admin.routing.module';
import { MaterializeModule } from 'angular2-materialize';
import { AdminService } from './admin.service';
import { MenuEsquerdaComponent } from './menu-esquerda/menu-esquerda.component';
import { PainelAdministrativoComponent } from './painel-administrativo/painel-administrativo.component';
import { MenuTopComponent } from './menu-top/menu-top.component';



@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterializeModule,
    FormsModule
  ],
  exports: [
    LoginComponent
  ],
  declarations: [
    LoginComponent,
    AdministradoresComponent,
    MenuEsquerdaComponent,
    PainelAdministrativoComponent,
    MenuTopComponent
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
