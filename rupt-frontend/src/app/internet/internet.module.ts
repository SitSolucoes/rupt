import { TimelineService } from './../services/timeline.service';
import { Timeline } from './../classes/timeline';
import { CategoriaLeitorService } from './../services/categoria-leitor.service';
import { InputMaskModule } from 'ng2-inputmask';
import { SliderComponent } from './slider/slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternetRoutingModule } from './internet-routing.module';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { UserComponent } from './user/user.component';
import { ContatoComponent } from './contato/contato.component';
import { HeaderComponent } from './header/header.component';
import { ModalCadastroLeitorComponent } from './modal-cadastro-leitor/modal-cadastro-leitor.component';
import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './news/news.component';
import { InternetInicioComponent } from './internet-inicio/internet-inicio.component';
import { CadastroLeitorComponent } from './cadastro-leitor/cadastro-leitor.component';
import { SlickSliderComponent } from './slider/slick-slider/slick-slider.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { CadastroEscritorComponent } from './cadastro-escritor/cadastro-escritor.component';
import { CategoriaSliderComponent } from './categoria-slider/categoria-slider.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ModalCategoriasComponent } from './modal-categorias/modal-categorias.component';
import { PublicacaoComponent } from './publicacao/publicacao.component';
import { FroalaViewModule, FroalaEditorModule } from 'angular2-froala-wysiwyg';
import { QuillEditorModule } from 'ngx-quill-editor';
import { ModalGenericoComponent } from './modal-generico/modal-generico.component';
import { RedefineSenhaComponent  } from './redefine-senha/redefine-senha.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { ModalExcluirComponent } from './modal-excluir/modal-excluir.component';
import { ModalRascunhoComponent } from './modal-rascunho/modal-rascunho.component';
import { VisualizacoesService } from 'app/services/visualizacoes.service';
import { InteracoesService } from 'app/services/interacoes.service';
import { InteracoesLeitorService } from 'app/services/interacoes-leitor.service';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { ModalCompartilharComponent } from 'app/internet/compartilhar/modal-compartilhar/modal-compartilhar.component';
import { ModalMensagemComponent } from './compartilhar/modal-mensagem/modal-mensagem.component';
import { PoliticaComponent } from './termos/politica/politica.component';
import { FacebookModule } from 'ngx-facebook';
import { ModalPesquisaComponent } from './modal-pesquisa/modal-pesquisa.component';
import { CategoriaComponent } from './lista-resultados/categoria/categoria.component';
import { PesquisaComponent } from './lista-resultados/pesquisa/pesquisa.component';
import { ListaComponent } from './lista-resultados/lista/lista.component';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha.component';
import { SeguidorService } from 'app/services/seguidor.service';
import {SlickSlider2Component} from './slider/slick-slider2/slick-slider2.component';
import { SlickSliderMobileComponent } from './slider/slick-slider-mobile/slick-slider-mobile.component';

@NgModule({ 
  imports: [
    CommonModule,
    InternetRoutingModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
    FacebookModule.forRoot(),
    QuillEditorModule
  ],
  declarations: [
    FaqComponent,
    HomeComponent,
    UserComponent,
    ContatoComponent,
    HeaderComponent,
    ModalCadastroLeitorComponent,
    ModalLoginComponent,
    FooterComponent,
    NewsComponent,
    InternetInicioComponent,
    SliderComponent,
    CadastroLeitorComponent,
    SlickSliderComponent,
    SlickSlider2Component,
    CadastroEscritorComponent,
    CategoriaSliderComponent,
    CategoriasComponent,
    ModalCategoriasComponent,
    PublicacaoComponent,
    ModalGenericoComponent,
    EsqueciSenhaComponent,
    ModalExcluirComponent,
    RedefineSenhaComponent,
    ModalRascunhoComponent,
    ModalCompartilharComponent,
    ImageCropperComponent,
    ModalMensagemComponent,
    PoliticaComponent,
    ModalPesquisaComponent,
    CategoriaComponent,
    PesquisaComponent,
    ListaComponent,
    RedefinirSenhaComponent,
    SlickSliderMobileComponent
  ],
  providers: [
    CategoriaLeitorService,
    TimelineService,
    VisualizacoesService,
    InteracoesService,
    InteracoesLeitorService,
    SeguidorService
  ]
})
export class InternetModule { }
