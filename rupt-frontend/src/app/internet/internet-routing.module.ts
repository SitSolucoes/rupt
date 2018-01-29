import { RedefineSenhaComponent } from './redefine-senha/redefine-senha.component';


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
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { PoliticaComponent } from './termos/politica/politica.component';
import { CategoriaComponent } from 'app/internet/lista-resultados/categoria/categoria.component';

const routes: Routes = [
  { path : '', component: InternetInicioComponent,
    children: [
      { path : 'noticias', component: HomeComponent},
      { path : 'faq', component: FaqComponent},
      { path : 'politica', component: PoliticaComponent},
      { path : 'perfil/:nick', component: UserComponent },
      { path : 'footer', component: FooterComponent },
      { path : 'perfil/:nick/:torne-se-um-escritor', component: UserComponent },
      { path : 'noticia/:id', component: NewsComponent },
      { path : 'cadastro', component: CadastroLeitorComponent },
      { path : 'cadastro-escritor', component: CadastroEscritorComponent },
      { path : 'publicacao', component: PublicacaoComponent },
      { path : 'publicacao/:id', component: PublicacaoComponent},
      { path : 'contato', component: ContatoComponent},
      { path : 'esqueci-senha', component:  EsqueciSenhaComponent},
      { path : 'redefinindoSenha/:token', component: RedefineSenhaComponent}, 
      { path : 'categorias/:categoria', component: CategoriaComponent},
      { path : '', redirectTo: 'noticias', pathMatch: 'full'},
      { path : '**', redirectTo: 'noticias', pathMatch: 'full'},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternetRoutingModule { }
