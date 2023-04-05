import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from '../models/dto/create-produto.dto';
import { UpdateProdutoDto } from '../models/dto/update-produto.dto';
import { ProdutoModel } from '../models/Produto';

@Injectable()
export class ProdutosService {
  
  async search(nome: string, categoria: string) {
    
    const query = ProdutoModel.find();
    if(nome)
    {
      query.where('nome').regex(new RegExp(nome, 'ig'));
    }
    if(categoria)
    {
      query.where('categoria').equals(categoria);
    }
    return await query.exec();
  }
  async create(createProdutoDto: CreateProdutoDto) {
    const dataAtual = this.getBrazillianTime();
    const novoProduto = { 
      ...createProdutoDto,
      dataCadastro: dataAtual,
      dataAtualizacao: dataAtual,
      numeroDeCliques: 0
    };
    const produtoFinal = await ProdutoModel
      .create(novoProduto);

    return produtoFinal;
  }

  async findAll() {
    return await ProdutoModel
      .find()
      .sort({numeroDeCliques: -1})
      .exec();
  }

  async findOne(id: string) {
    const produto = await ProdutoModel.findById(id).exec();
    await produto?.updateOne({numeroDeCliques: produto.numeroDeCliques.valueOf() + 1}).exec();
    const updatedProduto = await ProdutoModel.findById(id).exec();
    return updatedProduto;
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto) {

    return await ProdutoModel
      .findByIdAndUpdate(id, {
        ...updateProdutoDto,
        dataAtualizacao: this.getBrazillianTime()
      }).exec();
  }

  async remove(id: string) {
    return await ProdutoModel.findByIdAndDelete(id).exec();
  }

  private getBrazillianTime()
  {
    return new Date(Date.now() - 3 * 60 * 60 * 1000);
  }
}
