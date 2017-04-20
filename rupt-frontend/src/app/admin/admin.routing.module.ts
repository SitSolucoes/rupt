import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './../guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { PainelAdministrativoComponent } from './painel-administrativo/painel-administrativo.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const AdminRoutes: Routes = [
    { path : 'admin/login', component: LoginComponent},
    { path : 'admin', component: PainelAdministrativoComponent,
        //canActivate: [AuthGuard],
        children: [
        { path : 'home', canActivate: [AuthGuard], component: AdminHomeComponent},
        { path : 'administradores', canActivate: [AuthGuard], component: AdministradoresComponent},
        { path : 'esqueci-a-senha', canActivate: [AuthGuard], component: EsqueciSenhaComponent}       
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(AdminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{}