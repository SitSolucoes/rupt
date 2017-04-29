
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './../guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { PainelAdministrativoComponent } from './painel-administrativo/painel-administrativo.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LeitoresComponent } from './leitores/leitores.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { CategoriasComponent } from './categorias/categorias.component';

const AdminRoutes: Routes = [
    
    { path : 'admin', component: PainelAdministrativoComponent,
        //canActivate: [AuthGuard],
        children: [
        { path : 'login', component: LoginComponent},
        { path : 'esqueci-a-senha', component: EsqueciSenhaComponent},
        { path : 'home', canActivate: [AuthGuard], component: AdminHomeComponent},
        
        { path : 'administradores', canActivate: [AuthGuard], component: AdministradoresComponent},
        { path : 'categorias', canActivate: [AuthGuard], component: CategoriasComponent},
        { path : 'denuncias', canActivate: [AuthGuard], component: DenunciasComponent},
        { path : 'leitores', canActivate: [AuthGuard], component: LeitoresComponent},
        
        { path : 'editar/:id', canActivate: [AuthGuard], component: AdministradoresComponent},
        { path : '', redirectTo: 'home', pathMatch: 'full'},
        { path : '**', redirectTo: 'home', pathMatch: 'full'}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(AdminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{}