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
    
    { path : 'admin', component: PainelAdministrativoComponent,
        //canActivate: [AuthGuard],
        children: [
        { path : 'login', component: LoginComponent},
        { path : 'esqueci-a-senha', component: EsqueciSenhaComponent},
        { path : 'home', canActivate: [AuthGuard], component: AdminHomeComponent},
        { path : 'administradores', canActivate: [AuthGuard], component: AdministradoresComponent},
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(AdminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{}