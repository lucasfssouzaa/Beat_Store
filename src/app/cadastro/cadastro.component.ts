import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  obj: Cliente = new Cliente();
  mensagem: string = '';

  confirmarSenha: string = '';
  mensagemSenha: string = '';
  mensagemEmail: string = '';

  constructor(private service: ClienteService){}
  gravar() {
    this.mensagemSenha = '';
    this.mensagemEmail = '';
    this.mensagem = '';

    if (!this.obj.email) {
      this.mensagemEmail = 'E-mail é obrigatório!';
      if (!this.obj.senha) {
        this.mensagemSenha = 'Senha é obrigatória!';
        return;
      }
      return;
    }

    if (!this.obj.senha) {
      this.mensagemSenha = 'Senha é obrigatória!';
      return;
    }

    if (this.obj.senha !== this.confirmarSenha) {
      this.mensagemSenha = 'As senhas não conferem!';
      return;
    }

    this.service.verificarEmail(this.obj.email).subscribe({
      next: (emailExistente) => {
        if (emailExistente) {
          this.mensagemEmail = 'Esse e-mail já está em uso!';
        } else {
          this.service.inserir(this.obj);
          this.mensagem = "Cadastro Concluído com Sucesso";
          this.mensagemEmail = '';
          this.mensagemSenha = '';
        }
      },
      error: (err) => {
        this.mensagemEmail = 'Erro ao verificar e-mail, tente novamente.';
      }
    });
  }
  alterar(){}
  remover(){}
  pesquisar(){}
}
