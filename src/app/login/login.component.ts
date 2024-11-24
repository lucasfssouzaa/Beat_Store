import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  obj = { email: '', senha: '' };
  mensagem: string = '';

  constructor(private service: ClienteService) { }

  login() {
    const cliente: Cliente = {codigo: 0 , nome:"", telefone:"", email: this.obj.email, senha: this.obj.senha };
    this.service.verificarEmail(this.obj.email).subscribe({
      next: (emailExiste: boolean) => {
        if (emailExiste) {
          this.service.login(cliente).subscribe({
            next: (loginEfetuado) => {
              if (loginEfetuado) {
                this.mensagem = 'Login efetuado com sucesso';
                localStorage.setItem('codigoUsuario', loginEfetuado.codigo.toString());
                (window as any).atualizarIdUsuario(loginEfetuado.codigo);
              } else {
                this.mensagem = 'Login ou Senha incorretos';
              }
            },
            error: () => {
              this.mensagem = "Login ou senha incorretos!";
            }
          });
        } else {
          this.mensagem = "E-mail não encontrado. Verifique o e-mail informado.";
        }
      },
      error: () => {
        this.mensagem = 'Erro ao verificar o e-mail. Tente novamente mais tarde.';
      }
    });
    
  }
}
