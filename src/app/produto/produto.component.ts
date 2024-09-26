import { Component } from '@angular/core';
import { ItemCarrinho } from '../model/item-carrinho';
import { CommonModule } from '@angular/common';
import { Cesta } from '../model/cesta';
import { FormsModule } from '@angular/forms';
import { Item } from '../model/item/item.model';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent {
  public item: Item = new Item();
  public cesta: Cesta = new Cesta(); 
  public mensagem: string = "";
  public tamanhoSelecionado: string = "";

  constructor(){
    let json : string | null = localStorage.getItem("produto");
    if(json!=null){
      this.item = JSON.parse (json);
    } else {
      this.mensagem = "Produto não encontrado!";
    }
  }

  public adicionarAoCarrinho(item: Item) {
    if (this.tamanhoSelecionado) {
      const itemCarrinho: ItemCarrinho = new ItemCarrinho();
      itemCarrinho.codigo = new Date().getTime();
      itemCarrinho.item = item;
      itemCarrinho.tamanho = this.tamanhoSelecionado;
  
      let cesta: Cesta = JSON.parse(localStorage.getItem('cesta') || '{}');
      if (!cesta.itemCarrinho) {
        cesta = new Cesta();
      }
  
      cesta.itemCarrinho.push(itemCarrinho);
      
      localStorage.setItem('cesta', JSON.stringify(cesta));
  
      window.location.href = "./carrinho";
    } else {
      alert('Você deve selecionar um tamanho antes de adicionar ao carrinho.');
    }
  }
  
} 
