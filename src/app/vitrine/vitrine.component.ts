import { Component } from '@angular/core';
import { Item } from '../model/item/item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent {
  public itens: Item[] = [
    { codigo: 1, nome: "Camiseta", colecao: "Grafite", preco: 99, desc: "Esta camiseta faz parte da nossa coleção especial de arte urbana, com uma estampa exclusiva inspirada no grafite de rua. Feita de 100% algodão, é confortável e estilosa, ideal para o uso casual.",
      tecido: "100% Algodão", cor:"Preta com estampa grafite"
    },
    { codigo: 2, nome: "Camiseta", colecao: "Grafite", preco: 99, desc: "Esta camiseta faz parte da nossa coleção especial de arte urbana, com uma estampa exclusiva inspirada no grafite de rua. Feita de 100% algodão, é confortável e estilosa, ideal para o uso casual.",
      tecido: "100% Algodão", cor:"Preta com estampa grafite"
    },
    { codigo: 3, nome: "Camiseta", colecao: "Grafite", preco: 99, desc: "Esta camiseta faz parte da nossa coleção especial de arte urbana, com uma estampa exclusiva inspirada no grafite de rua. Feita de 100% algodão, é confortável e estilosa, ideal para o uso casual.", 
      tecido: "100% Algodão", cor:"Preta com estampa grafite"
    },
    { codigo: 4, nome: "Camiseta", colecao: "Grafite", preco: 99, desc: "Esta camiseta faz parte da nossa coleção especial de arte urbana, com uma estampa exclusiva inspirada no grafite de rua. Feita de 100% algodão, é confortável e estilosa, ideal para o uso casual.", 
      tecido: "100% Algodão", cor:"Preta com estampa grafite"
    },
    { codigo: 5, nome: "Moletom", colecao: "Grafite", preco: 149, desc: "Este moletom faz parte da nossa coleção especial de arte urbana, com uma estampa exclusiva inspirada no grafite de rua. É confortável e estilosa, ideal para o uso casual.", 
      tecido: "50% Algodão 50% Poliéster", cor:"Preta com estampa grafite"
    },
    { codigo: 6, nome: "Moletom", colecao: "Grafite", preco: 149, desc: "Este moletom faz parte da nossa coleção especial de arte urbana, com uma estampa exclusiva inspirada no grafite de rua. É confortável e estilosa, ideal para o uso casual.", 
      tecido: "50% Algodão 50% Poliéster", cor:"Preta com estampa grafite"
    },
    { codigo: 7, nome: "Moletom", colecao: "Grafite", preco: 149, desc: "Este moletom faz parte da nossa coleção especial de arte urbana, com uma estampa exclusiva inspirada no grafite de rua. É confortável e estilosa, ideal para o uso casual.", 
      tecido: "50% Algodão 50% Poliéster", cor:"Preta com estampa grafite"
    },
    { codigo: 8, nome: "Moletom", colecao: "Grafite", preco: 149, desc: "Este moletom faz parte da nossa coleção especial de arte urbana, com uma estampa exclusiva inspirada no grafite de rua. É confortável e estilosa, ideal para o uso casual.", 
      tecido: "50% Algodão 50% Poliéster", cor:"Preta com estampa grafite"
    },
    { codigo: 9, nome: "Tênis", colecao: "Grafite", preco: 249, desc: "Este tênis faz parte da nossa coleção especial de arte urbana, com um modelo exclusivo inspirada no grafite de rua. É confortável e estiloso, ideal para o uso casual.", 
      tecido: "", cor:"Branco"
    },
    { codigo: 10, nome: "Tênis", colecao: "Grafite", preco: 349, desc: "Este tênis faz parte da nossa coleção especial de arte urbana, com um modelo exclusivo inspirada no grafite de rua. É confortável e estiloso, ideal para o uso casual.", 
      tecido: "", cor:"Branco"
    },
    { codigo: 11, nome: "Tênis", colecao: "Grafite", preco: 249, desc: "Este tênis faz parte da nossa coleção especial de arte urbana, com um modelo exclusivo inspirada no grafite de rua. É confortável e estiloso, ideal para o uso casual.", 
      tecido: "", cor:"Preto"
    },
    { codigo: 12, nome: "Tênis", colecao: "Grafite", preco: 349, desc: "Este tênis faz parte da nossa coleção especial de arte urbana, com um modelo exclusivo inspirada no grafite de rua. É confortável e estiloso, ideal para o uso casual.", 
      tecido: "", cor:"Preto"
    },
  ]
  public mensagem: string = "";
  public filtro = "";

  public abrirDetalhe(item: Item){
      localStorage.setItem("produto", JSON.stringify(item));
      window.location.href = "./produto";
  }

  public filtrar(nome: string){
    this.filtro = nome;
}
}
