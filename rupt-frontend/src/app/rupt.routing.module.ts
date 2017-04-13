import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//import { HomeComponent } from './home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { AdministradoresComponent } from './admin/administradores/administradores.component';
import { AppComponent } from './app.component';
//import { CursosComponent } from './cursos/cursos.component';
//import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
//import { CursoInesisteComponent } from './cursos/curso-inesiste/curso-inesiste.component';

const appRoutes: Routes = [
    { path : '', component: AppComponent},
    //{ path : 'admin', component: LoginComponent},
    //{ path : 'admin/administradores', component: AdministradoresComponent},
    //{ path : 'curso/:id', component: CursoDetalheComponent},
    //{ path : 'naoEncontrado', component: CursoInesisteComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class RuptRoutingModule{}