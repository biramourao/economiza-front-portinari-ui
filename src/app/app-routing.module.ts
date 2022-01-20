import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {GastosComponent} from './gastos/gastos.component';
import {FormGastosComponent} from './form-gastos/form-gastos.component';


const appRoutes: Routes = [
{
  path: 'gastos',
  component: GastosComponent,
  canActivate: [AuthGuard]
},
  {
    path: 'gastos/cadastrar',
    component: FormGastosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gastos/:tipo/:codGasto',
    component: FormGastosComponent,
    canActivate: [AuthGuard]
  },
{ path: '', redirectTo: '/gastos', canActivate: [AuthGuard] },

/*{ path: 'relatorio', component: GraficosGastosComponent, canActivate: [AuthGuard] },
{ path: 'not-found', component: NotFoundComponent, canActivate: [AuthGuard] },
{ path: 'cadastro-usuario', component: CadastroUsuarioComponent },
{ path: 'detalhes-usuario', component: DetalheCadastroComponent, canActivate: [AuthGuard] },
{ path: 'categorias-de-gasto', component: CategoriasDeGastoComponent, canActivate: [AuthGuard] },

{
  path: 'categorias-de-gasto/:tipo/:codCategoriaGasto',
  component: FormCategoriaDeGastoComponent,
  canActivate: [AuthGuard]
},
{
  path: 'gastos/:tipo/:codGasto',
  component: FormGastoComponent,
  canActivate: [AuthGuard]
},
{
  path: 'fontes-de-renda',
  component: FontesDeRendaComponent,
  canActivate: [AuthGuard]
},
{
  path: 'fontes-de-renda/:tipo/:codFonteDeRenda',
  component: FormFonteDeRendaComponent,
  canActivate: [AuthGuard]
},*/
{ path: '**', redirectTo: '/login', canActivate: [AuthGuard] }
//{ path: '**', redirectTo: '/login' }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
