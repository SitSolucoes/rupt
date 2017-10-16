import { AdminGuard } from './admin.guard';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { PainelAdministrativoComponent } from './painel-administrativo/painel-administrativo.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LeitoresComponent } from './leitores/leitores.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { RedefineSenhaComponent } from './redefine-senha/redefine-senha.component';
import { MensagensComponent } from './mensagens/mensagens.component';
import { EscritoresComponent } from './escritores/escritores.component';

const AdminRoutes: Routes = [
    
    { path : 'admin', component: PainelAdministrativoComponent,
        //canActivate: [AuthGuard],
        children: [
        { path : 'login', component: LoginComponent},
        { path : 'esqueci-a-senha', component: EsqueciSenhaComponent},
        { path : 'redefineSenha/:token', component: RedefineSenhaComponent},
        { path : 'home', canActivate: [AdminGuard], component: AdminHomeComponent},
        { path : 'administradores', canActivate: [AdminGuard], component: AdministradoresComponent},
        { path : 'categorias', canActivate: [AdminGuard], component: CategoriasComponent},
        { path : 'denuncias', canActivate: [AdminGuard], component: DenunciasComponent},
        { path : 'leitores', canActivate: [AdminGuard], component: LeitoresComponent},
        { path : 'escritores', canActivate: [AdminGuard], component: EscritoresComponent},
        { path : 'pagamentos', canActivate: [AdminGuard], component: PagamentoComponent},
        { path : 'mensagens', canActivate: [AdminGuard], component: MensagensComponent},
        { path : 'editar/:id', canActivate: [AdminGuard], component: AdministradoresComponent},
        { path : '', redirectTo: 'home', pathMatch: 'full'},
        { path : '**', redirectTo: 'home', pathMatch: 'full'}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(AdminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{}