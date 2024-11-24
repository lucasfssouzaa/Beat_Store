import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Item } from '../model/item';
import { ItemService } from '../service/item.service';


@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent {
  public item: Produto = new Produto();
  public mensagem: string = "";
  public tamanhoSelecionado: string = "";

  constructor(private itemService: ItemService) {
    let json: string | null = localStorage.getItem("produto");
    if (json != null) {
      this.item = JSON.parse(json);
    }
  }

  public adicionarItem(item: Produto) {
    if (this.tamanhoSelecionado) {
      const idUsuario = (window as any).idUsuario || localStorage.getItem('idUsuario');
  
      if (idUsuario) {
        const itemCarrinho: Item = new Item();
  
        itemCarrinho.produto = item.codigo;
        itemCarrinho.cliente = Number(idUsuario);
        itemCarrinho.tamanho = this.tamanhoSelecionado;
        itemCarrinho.nome = item.nome;
        itemCarrinho.preco = item.preco;
  
        this.itemService.inserir(itemCarrinho).subscribe({
          next: (res) => console.log('Resposta do backend:', res),
          error: (err) => console.error('Erro ao salvar no backend:', err),
        })
        window.location.href = './carrinho';
      } else {
        window.location.href = './login';
      }
    } else {
      alert('Você deve selecionar um tamanho antes de adicionar ao carrinho.');
    }
  }
  
}
