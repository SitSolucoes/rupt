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

@NgModule({ 
  imports: [
    CommonModule,
    InternetRoutingModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
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
    CadastroEscritorComponent,
    CategoriaSliderComponent,
    CategoriasComponent,
    ModalCategoriasComponent,
    PublicacaoComponent,
    ModalGenericoComponent
  ],
  providers: [
    CategoriaLeitorService,
    TimelineService
  ]
})
export class InternetModule { }
