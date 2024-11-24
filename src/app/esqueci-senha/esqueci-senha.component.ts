import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent {
  obj: Cliente = new Cliente();
  mensagem: string = '';

  constructor(private service: ClienteService){}

  recuperaSenha() {
    this.mensagem = '';

    this.service.verificarEmail(this.obj.email).subscribe({
      next: (emailExistente) => {
        if (emailExistente) {
          this.mensagem = 'Nova senha enviada por e-mail';
        } else {
          this.mensagem = "Não existe nenhum usuário com esse e-mail cadastrado";
        }
      },
      error: (err) => {
        this.mensagem = 'Erro ao recuperar senha, tente novamente.';
      }
    });
  }
}
