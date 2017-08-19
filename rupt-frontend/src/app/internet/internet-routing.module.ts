
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "app/internet/home/home.component";

const routes: Routes = [
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  { path : 'home', component: HomeComponent,
    children: [
      {path : '**', redirectTo: 'home', pathMatch: 'full'}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternetRoutingModule { }
