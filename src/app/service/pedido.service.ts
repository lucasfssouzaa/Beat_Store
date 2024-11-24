import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../model/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  inserir(obj: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>('http://localhost:8080/api/pedido', obj);
}
}