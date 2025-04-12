import { Routes } from '@angular/router';
import { ConsultarProdutosComponent } from './components/pages/consultar-produtos/consultar-produtos.component';
import { CadastrarProdutoComponent } from './components/pages/cadastrar-produto/cadastrar-produto.component';
import { EditarProdutoComponent } from './components/pages/editar-produto/editar-produto.component';
import { ConsultarFornecedoresComponent } from './components/pages/consultar-fornecedores/consultar-fornecedores.component';
import { CadastrarFornecedorComponent } from './components/pages/cadastrar-fornecedor/cadastrar-fornecedor.component';
import { EditarFornecedorComponent } from './components/pages/editar-fornecedor/editar-fornecedor.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CriarUsuarioComponent } from './components/pages/criar-usuario/criar-usuario.component';
import { AutenticarUsuarioComponent } from './components/pages/autenticar-usuario/autenticar-usuario.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/errors/unauthorized/unauthorized.component';

export const routes: Routes = [
    {
        path: 'pages/criar-usuario',
        component: CriarUsuarioComponent
    },
    {
        path: 'pages/autenticar-usuario',
        component: AutenticarUsuarioComponent
    },
    {
        path: 'pages/consultar-produtos',
        component: ConsultarProdutosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pages/consultar-fornecedores',
        component: ConsultarFornecedoresComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pages/cadastrar-produto',
        component: CadastrarProdutoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pages/cadastrar-fornecedor',
        component: CadastrarFornecedorComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pages/editar-produto/:id',
        component: EditarProdutoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pages/editar-fornecedor/:id',
        component: EditarFornecedorComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pages/dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'errors/unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pages/autenticar-usuario'
    }
];
