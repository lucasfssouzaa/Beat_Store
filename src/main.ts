import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { UserService } from './app/service/user.service';

const userService = new UserService();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// Variável global para armazenar o id do usuário
(window as any).idUsuario = null;

// Função para atualizar a interface com base no estado de login
function atualizarIdUsuario(id: number | null) {
  const idElement = document.querySelector('#idUsuario');
  const logarElement = document.querySelector('#logar') as HTMLElement;
  const criarElement = document.querySelector('#criar') as HTMLElement;
  const logadoElement = document.querySelector('#logado') as HTMLElement;

  if (idElement) {
    idElement.textContent = id ? id.toString() : '';
  }

  (window as any).idUsuario = id;

  // Mostrar ou esconder os elementos de login com base no estado do usuário
  if (id) {
    (window as any).usuarioConectado = true;
    logarElement.style.display = 'none';
    criarElement.style.display = 'none';
    logadoElement.style.display = 'block';
  } else {
    (window as any).usuarioConectado = false;
    logarElement.style.display = 'block';
    criarElement.style.display = 'block';
    logadoElement.style.display = 'none';
  }

  localStorage.setItem('idUsuario', id ? id.toString() : '');
}

(window as any).atualizarIdUsuario = atualizarIdUsuario;

(window as any).sair = function () {
  userService.sair();
  
  atualizarIdUsuario(null);

  window.location.href = './login';
};

const idRestaurado = localStorage.getItem('idUsuario');
atualizarIdUsuario(idRestaurado ? Number(idRestaurado) : null);
