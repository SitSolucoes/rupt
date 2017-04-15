import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { PainelAdministrativoComponent } from './painel-administrativo/painel-administrativo.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const AdminRoutes: Routes = [
    { path : 'admin', component: PainelAdministrativoComponent, children: [
        { path : 'administradores', component: AdministradoresComponent},
        { path : 'home', component: AdminHomeComponent},
        { path : 'login', component: LoginComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(AdminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{}