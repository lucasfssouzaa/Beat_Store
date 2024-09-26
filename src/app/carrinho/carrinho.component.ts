import { Component } from '@angular/core';
import { Item } from '../model/item/item.model';
import { CommonModule } from '@angular/common';
import { Cesta } from '../model/cesta';
import { ItemCarrinho } from '../model/item-carrinho';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {

  public cesta: Cesta = new Cesta();
  public vazio: boolean = true;
  public total: number = 0;

  constructor(){
    let json : string | null = localStorage.getItem("cesta");
    if(json!=null){
      this.cesta = JSON.parse(json);
      this.calcularTotal();
      if (this.cesta.itemCarrinho.length > 0) {
        this.vazio = false;
      }
    } else {
      this.vazio = true;
    }
  }
  public esvaziar() {
    this.cesta = new Cesta();
    localStorage.setItem("cesta", JSON.stringify(this.cesta));
    this.vazio = true;
    this.total = 0;
    window.location.href = "./carrinho";
  }

  public remover(itemRemover: ItemCarrinho) {
    this.cesta.itemCarrinho = this.cesta.itemCarrinho.filter(item => 
        item.codigo !== itemRemover.codigo || item.tamanho !== itemRemover.tamanho
    );
    localStorage.setItem("cesta", JSON.stringify(this.cesta));
    if (this.cesta.itemCarrinho.length === 0) {
        this.vazio = true;
    }
    this.calcularTotal();
  }

  private calcularTotal() {
    this.total = this.cesta.itemCarrinho.reduce((acc, item) => {
      return acc + item.item.preco;
    }, 0);
  }
}
