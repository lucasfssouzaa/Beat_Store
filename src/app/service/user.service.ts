import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private idUsuarioSubject = new BehaviorSubject<number | null>(null);

  idUsuario$ = this.idUsuarioSubject.asObservable();

  constructor() {
    const idRestaurado = localStorage.getItem('idUsuario');
    if (idRestaurado) {
      this.idUsuarioSubject.next(Number(idRestaurado));
    }
  }

  atualizarUsuario(id: number) {
    if (id) {
      localStorage.setItem('idUsuario', id.toString());
      this.idUsuarioSubject.next(id);
    } else {
      this.sair();
    }
  }

  sair() {
    localStorage.removeItem('idUsuario');
    this.idUsuarioSubject.next(null);
  }
}
