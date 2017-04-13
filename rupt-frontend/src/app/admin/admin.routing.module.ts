import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { AdministradoresComponent } from './administradores/administradores.component';

const AdminRoutes: Routes = [
    { path : 'admin', component: LoginComponent},
    { path : 'admin/administradores', component: AdministradoresComponent},
];

@NgModule({
    imports: [RouterModule.forChild(AdminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{}