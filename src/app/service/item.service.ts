import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  inserir(obj: Item): Observable<Item> {
    return this.http.post<Item>('http://localhost:8080/api/item', obj);
  }

  obterCarrinho(idUsuario: number): Observable<any> {
    return this.http.get("http://localhost:8080/api/carrinho/usuario/"+idUsuario);
}

  remover(idItem :number):Observable<any> {
    return this.http.delete("http://localhost:8080/api/item/"+idItem); 
  }

  limpar(idUsuario: number):Observable<any> {
    return this.http.delete("http://localhost:8080/api/item/cliente/"+idUsuario); 
  }
}