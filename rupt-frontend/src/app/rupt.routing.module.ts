import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//import { HomeComponent } from './home/home.component';
import { LoginComponent } from './admin/login/login.component';
//import { CursosComponent } from './cursos/cursos.component';
//import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
//import { CursoInesisteComponent } from './cursos/curso-inesiste/curso-inesiste.component';

const appRoutes: Routes = [
    //{ path : '', component: HomeComponent},
    { path : 'admin', component: LoginComponent},
    //{ path : 'cursos', component: CursosComponent},
    //{ path : 'curso/:id', component: CursoDetalheComponent},
    //{ path : 'naoEncontrado', component: CursoInesisteComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class RuptRoutingModule{}