

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/internet/home/home.component';
import { FaqComponent } from 'app/internet/faq/faq.component';
import { UserComponent } from 'app/internet/user/user.component';
import { FooterComponent } from 'app/internet/footer/footer.component';
import { NewsComponent } from 'app/internet/news/news.component';
import { InternetInicioComponent } from 'app/internet/internet-inicio/internet-inicio.component';
import { ContatoComponent } from './contato/contato.component';
import { CadastroLeitorComponent} from './cadastro-leitor/cadastro-leitor.component';
import { CadastroEscritorComponent } from './cadastro-escritor/cadastro-escritor.component';
import {PublicacaoComponent} from './publicacao/publicacao.component';

const routes: Routes = [
  { path : '', redirectTo: 'rupt', pathMatch: 'full'},
  { path : 'rupt', component: InternetInicioComponent,
    children: [
      { path : 'noticias', component: HomeComponent},
      { path : 'faq', component: FaqComponent},
      { path : 'perfil/:nick', component: UserComponent },
      { path : 'footer', component: FooterComponent },
      { path : 'noticia/:id', component: NewsComponent },
      { path : 'cadastro', component: CadastroLeitorComponent },
      { path : 'cadastro-escritor', component: CadastroEscritorComponent },
      { path : 'publicacao', component: PublicacaoComponent },
      { path : 'contato', component: ContatoComponent},
      { path : '', redirectTo: 'noticias', pathMatch: 'full'},
      { path : '**', redirectTo: 'noticias', pathMatch: 'full'},

    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternetRoutingModule { }
