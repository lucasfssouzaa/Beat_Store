import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { LoginComponent } from './login/login.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { DetalheComponent } from './detalhe/detalhe.component';

export const routes: Routes = [
    {path: "", component: VitrineComponent},
    {path: "cadastro", component: CadastroComponent},
    {path: "login", component: LoginComponent},
    {path: "vitrine", component: VitrineComponent},
    {path: "carrinho", component: CarrinhoComponent},
    {path: "esqueci-senha", component: EsqueciSenhaComponent},
    {path: "detalhe", component: DetalheComponent}
];
