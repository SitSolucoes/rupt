import { AuthService } from './../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { AdminRoutingModule } from './admin.routing.module';
import { MaterializeModule } from 'angular2-materialize';
import { MenuEsquerdaComponent } from './menu-esquerda/menu-esquerda.component';
import { PainelAdministrativoComponent } from './painel-administrativo/painel-administrativo.component';
import { MenuTopComponent } from './menu-top/menu-top.component';
import { AdministradoresService } from '../services/administradores.service';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { LeitoresComponent } from './leitores/leitores.component';



@NgModule({
  declarations: [
    LoginComponent,
    AdministradoresComponent,
    MenuEsquerdaComponent,
    PainelAdministrativoComponent,
    MenuTopComponent,
    AdminHomeComponent,
    EsqueciSenhaComponent,
    LeitoresComponent
  ],
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule,
    AdminRoutingModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    AdministradoresService,
    AuthService
  ]
})
export class AdminModule { }
