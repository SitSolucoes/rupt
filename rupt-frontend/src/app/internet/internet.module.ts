import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternetRoutingModule } from './internet-routing.module';
import { HomeComponent } from './home/home.component';
import { ContatoComponent } from './contato/contato.component';
import { HeaderComponent } from './header/header.component';
import { ModalCadastroLeitorComponent } from './modal-cadastro-leitor/modal-cadastro-leitor.component';

@NgModule({ 
  imports: [
    CommonModule,
    InternetRoutingModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    ContatoComponent,
    HeaderComponent,
    ModalCadastroLeitorComponent
  ]
})
export class InternetModule { }
