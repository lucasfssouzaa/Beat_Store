import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  verificarEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/api/cliente/verifica-email/${email}`);
  }

  inserir(obj: Cliente): string {
    let mensagem = "";
    this.http.post("http://localhost:8080/api/cliente", obj).subscribe();
    return mensagem;
  }

  login(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:8080/api/cliente/login', cliente);
  }
}
