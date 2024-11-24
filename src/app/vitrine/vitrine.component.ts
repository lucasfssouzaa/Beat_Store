import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent {
  public itens: Produto[] = [];  
  public mensagem: string = "";
  public filtro = "";
  public pesquisa = "";

  constructor(private service : ProdutoService){
    this.carregarVitrine();
  }
  carregarVitrine(){
    this.service.listar().subscribe({
      next: (data) => {
        console.log(data);
        this.itens = data;
      },      
      error: (msg) => { this.mensagem = "ocorreu um erro, volte mais tarde" }
    });    
  }

  public abrirDetalhe(item: Produto){
    localStorage.setItem("produto", JSON.stringify(item));
    window.location.href = "./detalhe";    
  }

  public filtrar(nome: string){
    this.filtro = nome;
  }

  public atualizarPesquisa(pesquisa: string): void {
    this.filtro = pesquisa; 
  }
}
