import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Peditem } from '../model/peditem';

@Injectable({
  providedIn: 'root'
})
export class PeditemService {

  constructor(private http: HttpClient) { }

  inserir(obj: Peditem): Observable<Peditem> {
    return this.http.post<Peditem>('http://localhost:8080/api/peditem', obj);
  }
}
