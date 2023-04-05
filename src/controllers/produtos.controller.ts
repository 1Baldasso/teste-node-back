import { Controller, Query, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutosService } from '../services/produtos.service';
import { CreateProdutoDto } from '../models/dto/create-produto.dto';
import { UpdateProdutoDto } from '../models/dto/update-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @Get()
  findAll(@Query('nome') nome: string, @Query('categoria') categoria: string) {
    if(nome || categoria)
    {
      return this.produtosService.search(nome, categoria);
    }
    return this.produtosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    this.produtosService.update(id, updateProdutoDto);
    return {message: "Updated", object: await this.produtosService.findOne(id)};
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {message: "Object removed successfully", deleted: await this.produtosService.remove(id)};
  }
}
