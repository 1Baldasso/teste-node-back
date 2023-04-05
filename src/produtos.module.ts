import { Module } from '@nestjs/common';
import { ProdutosService } from './services/produtos.service';
import { ProdutosController } from './controllers/produtos.controller';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService]
})
export class ProdutosModule {}
