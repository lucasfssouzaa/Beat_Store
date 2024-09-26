import { Item } from "./item/item.model";

export class ItemCarrinho {
    public codigo: number = 0;
    public item: Item = new Item();
    public tamanho: string = "";
}
