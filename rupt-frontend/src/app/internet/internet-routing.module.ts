
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "app/internet/home/home.component";
import { FaqComponent } from "app/internet/faq/faq.component";

const routes: Routes = [
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  { path : 'home', component: HomeComponent,
    children: [
      {path : '**', redirectTo: 'home', pathMatch: 'full'}
    ]},
    { path : 'faq', component: FaqComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternetRoutingModule { }
