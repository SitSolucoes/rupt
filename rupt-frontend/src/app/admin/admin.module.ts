import { PostsService } from './../services/posts.service';
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
import { CategoriasComponent } from './categorias/categorias.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { DenunciasService } from './../services/denuncias.service';
import { SugestoesService } from './../services/sugestoes.service';
import { NotificacoesService } from './../services/notificacoes.service';
import {Ng2PaginationModule} from 'ng2-pagination';
import { LeitoresService } from './../services/leitores.service';
import { AuthService } from './../services/auth.service';
import { RedefineSenhaComponent } from './redefine-senha/redefine-senha.component';
import { MensagensComponent } from './mensagens/mensagens.component';
import { EscritoresComponent } from './escritores/escritores.component';



@NgModule({
  declarations: [
    LoginComponent,
    AdministradoresComponent,
    MenuEsquerdaComponent,
    PainelAdministrativoComponent,
    MenuTopComponent,
    AdminHomeComponent,
    EsqueciSenhaComponent,
    LeitoresComponent,
    CategoriasComponent,
    DenunciasComponent,
    RedefineSenhaComponent,
    MensagensComponent,
    EscritoresComponent,
  ],
  imports: [
    Ng2PaginationModule,
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
    LeitoresService,
    NotificacoesService,
    SugestoesService,
    AuthService,
    DenunciasService,
    PostsService
  ]
})
export class AdminModule { }
