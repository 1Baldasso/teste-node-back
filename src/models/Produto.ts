import {model,Schema,Document} from "mongoose";

interface IProduto extends Document {
    nome: string;
    preco: number;
    descricao: string;
    quantidade: number;
    categoria: string;
    imagem: string;
    dataCadastro: Date;
    dataAtualizacao: Date;
    numeroDeCliques: Number;
}

const ProdutoSchema = new Schema({
    nome: { type: String, required: true},
    preco: { type: Number, required: true},
    descricao: { type: String, required: true},
    quantidade: { type: Number, required: true},
    categoria: { type: String, required: true},
    imagem: { type: String, required: true},
    dataCadastro: { type: Date, required: true},
    dataAtualizacao: { type: Date, required: true},
    numeroDeCliques: { type: Number, required: true}
});

type Produto = {
    nome: string;
    preco: number;
    descricao: string;
    quantidade: number;
    categoria: string;
    imagem: string;
}

ProdutoSchema.index({numeroDeCliques: -1})

const ProdutoModel = model<IProduto>('produtos', ProdutoSchema);
export{
    ProdutoModel,
    Produto,
    IProduto
}