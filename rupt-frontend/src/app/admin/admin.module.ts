import { CategoriaFiltroService } from './../services/categoria-filtro.service';
import { CurrencyFormatPipe } from './../shared/currency-format-pipe.pipe';
import { DndModule, DragDropService, DragDropConfig, DragDropSortableService} from 'ng2-dnd';
import { MasksDirective } from './../shared/masks.directive';
import { CategoriasService } from './../services/categorias.service';
import { CpfCnpjPipe } from './../shared/cpf-cnpj.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MensagensService } from './../services/mensagens.service';
import { EscritoresService } from './../services/escritores.service';
import { PostsService } from './../services/posts.service';
import { InputMaskModule } from 'ng2-inputmask';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { PagamentoComponent } from './pagamento/pagamento.component';


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
    CpfCnpjPipe,
    ListaCategoriasComponent,
    MasksDirective,
    PagamentoComponent,
    CurrencyFormatPipe
  ],

  imports: [
    Ng2PaginationModule,
    CommonModule,
    MaterializeModule,
    FormsModule,
    AdminRoutingModule,
    InputMaskModule,
    ReactiveFormsModule,
    DndModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    AdministradoresService,
    LeitoresService,
    NotificacoesService,
    SugestoesService,
    EscritoresService,
    AuthService,
    DenunciasService,
    PostsService,
    MensagensService,
    CategoriasService,
    DragDropService,
    DragDropConfig,
    DragDropSortableService,
    CategoriaFiltroService
  ]
})
export class AdminModule { }