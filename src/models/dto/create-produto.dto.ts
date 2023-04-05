export class CreateProdutoDto {
    nome: string;
    preco: number;
    quantidade: number;
    descricao: string;
    categoria: string;
    imagem: string;
    constructor(produto:CreateProdutoDto) {
        this.nome = produto.nome;
        this.preco = produto.preco;
        this.quantidade = produto.quantidade;
        this.descricao = produto.descricao;
        this.categoria = produto.categoria;
        this.imagem = produto.imagem;
        return this;
    }
}
