
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "app/internet/home/home.component";
import { FaqComponent } from "app/internet/faq/faq.component";
import { UserComponent } from 'app/internet/user/user.component';
import { FooterComponent } from 'app/internet/footer/footer.component';
import { NewsComponent } from 'app/internet/news/news.component';

const routes: Routes = [
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  { path : 'home', component: HomeComponent,
    children: [
      {path : '**', redirectTo: 'home', pathMatch: 'full'}
    ]},
    { path : 'faq', component: FaqComponent},
    { path : 'user', component: UserComponent },
    { path : 'footer', component: FooterComponent },
    { path : 'news', component: NewsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternetRoutingModule { }
