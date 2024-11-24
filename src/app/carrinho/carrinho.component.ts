import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../model/item';
import { ItemService } from '../service/item.service';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../model/pedido';
import { PedidoService } from '../service/pedido.service';
import { Peditem } from '../model/peditem';
import { PeditemService } from '../service/peditem.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent {
  public carrinho: Item[] = [];
  public vazio: boolean = true;
  public total: number = 0;
  public logado: boolean = false;
  public finalizar: boolean = false;
  public mensagem: String = "";
  public finalizado: boolean = false;

  public lagradouro: String = "";
  public numero: String = "";
  public bairro: String = "";
  public cidade: String = "";
  public estado: String = "";
  public cep: String = "";

  public get endereco(): string {
    return `${this.lagradouro}, ${this.numero} - ${this.bairro}, ${this.cidade} - ${this.estado}, ${this.cep}`;
  }


  constructor(private itemService: ItemService, private pedidoService: PedidoService, private peditemService: PeditemService) {
    const idUsuario = localStorage.getItem('idUsuario');
    if (idUsuario) {
      this.logado = true;
      this.carregarCarrinho(parseInt(idUsuario, 10));
    } else {
      this.vazio = true;
    }
  }

  private carregarCarrinho(idUsuario: number): void {
    this.itemService.obterCarrinho(idUsuario).subscribe({
      next: (data) => {
        this.carrinho = data;
        this.vazio = this.carrinho.length === 0;
        this.calcularTotal();
      },
      error: (err) => {
        console.error('Erro ao carregar o carrinho:', err);
      }
    });
  }

  public finalizarCompra(){
    this.finalizar = true;
  }

  public esvaziarCarrinho(): void {
    const requests = this.carrinho.map((produto) => this.itemService.remover(produto.codigo));
  
    Promise.all(requests.map(req => req.toPromise()))
      .then(() => {
        this.carrinho = [];
        this.vazio = true;
        this.total = 0;
        console.log('Carrinho esvaziado com sucesso!');
      })
      .catch((err) => {
        console.error('Erro ao esvaziar o carrinho:', err);
      });
      window.location.reload();
  }

  public excluir(idItem: number){
    this.itemService.remover(idItem).subscribe({
      next: (data) => {
        this.carrinho = data;
        this.vazio = this.carrinho.length === 0;
        this.calcularTotal();
      },
      error: (err) => {
        console.error('Erro ao excluir:', err);
      }
    });
    window.location.reload();
  }

  private calcularTotal(): void {
    this.total = this.carrinho.reduce((acc, item) => acc + item.preco, 0);
  }

  public comprar() {
    if (
      !this.lagradouro.trim() || 
      !this.numero || 
      !this.bairro.trim() || 
      !this.cidade.trim() || 
      !this.estado.trim() || 
      !this.cep.trim()
    ) {
      this.mensagem = "Preencha todos os campos";
    } else {
      const idUsuario = parseInt(localStorage.getItem('idUsuario') || '0', 10);
      
      if (idUsuario > 0) {
        const pedido = new Pedido();
        pedido.cliente = idUsuario;
        pedido.total = this.total;
        pedido.endereco = this.endereco;
        
        this.pedidoService.inserir(pedido).subscribe({
          next: (pedidoSalvo) => {
            this.mensagem = `Compra efetuada com sucesso, o código do seu pedido é ${pedidoSalvo.codigo}.`;
            
            const requests2 = this.carrinho.map((item) => {
              const peditem = new Peditem();
              peditem.pedido = pedidoSalvo.codigo;
              peditem.produto = item.produto;
              peditem.tamanho = item.tamanho;
              this.peditemService.inserir(peditem).subscribe();
            });
            const requests = this.carrinho.map((produto) => this.itemService.remover(produto.codigo));
  
            Promise.all(requests.map(req => req.toPromise()))
            .then(() => {
            this.carrinho = [];
            this.vazio = true;
            this.total = 0;
            console.log('Carrinho esvaziado com sucesso!');
            })
            .catch((err) => {
            console.error('Erro ao esvaziar o carrinho:', err);
            });
            this.finalizado = true;
          },
          error: (err) => {
              console.error('Erro ao salvar o pedido:', err);
              this.mensagem = "Erro ao finalizar a compra. Tente novamente mais tarde.";
          }
      });
      } else {
        this.mensagem = "Erro: usuário não identificado";
      }
    }
  }
}
